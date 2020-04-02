import tinycolor from 'tinycolor2';
import axios from 'axios';
import {Subject,from,merge} from 'rxjs';
import {map,throttleTime,switchMap,share} from 'rxjs/operators';

const API_RATE_LIMIT_MS = 1000;

export const GLOBALTON = createColorFeedGateway();

export function createColorFeedGateway(){
  const client = axios.create({
    baseURL: '/.netlify/functions'
  });

  const colorSink = new Subject();
  const refresher = new Subject();

  const colorsFromServer = merge(
    colorSink.pipe(
      throttleTime(API_RATE_LIMIT_MS, undefined, {leading:true,trailing:true}),
      map(c=>c.toHexString()),
      switchMap(colorHex=>{
        console.log('sending %s to server', colorHex);
        return from(client.put( "/color", colorHex ));
      })),
    refresher.pipe(
      switchMap( () => from(client.get("/color")) )
    )
  ).pipe(
    map(response => tinycolor(response.data)),
    share()
  );

  colorsFromServer.subscribe( c => console.log('new color from server:',c.toHexString()));

  function refreshColor(){
    refresher.next();
  }

  function putColor(color){
    colorSink.next(color);
  }

  function onColorChange(onColor){
    colorsFromServer.subscribe(onColor);
  }

  return {
    putColor,
    refreshColor,
    onColorChange
  };
}

