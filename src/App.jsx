import { style } from 'solid-js/web';
import './App.css'
import { createSignal, onMount,createEffect, lazy } from "solid-js";
import { Route, Router } from '@solidjs/router';

const Player = lazy(() => import('./pages/player'));
const Home = lazy(() => import('./pages/home'));

export default function App() {
  return(
    <>
      <Route path="/" component={Home} preload={false}></Route>
      <Route path="/player/:nick" component={Player} preload={false}></Route>
    </>
  );
}
