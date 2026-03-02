import '../App.css'
import { createSignal, onMount,createEffect, lazy } from "solid-js";
import { Route } from '@solidjs/router';

function App() {
  let videoRef;
  const [teams, setTeams] = createSignal([]);
  const [playerSkin, setPlayerSkin] = createSignal([]);


  onMount(async () => {
    const res = await fetch("http://localhost:3001/teams");
    const data = await res.json();

    setTeams(data);
  });


function Player({ nick }) {
  const headUrl = `https://mc-heads.net/avatar/${encodeURIComponent(nick)}/16`;

  return (
    <div className="mapPlayers">
      <img
        src={headUrl}
        alt={`${nick}`}
        width="16"  
        height="16"
      />
      <p>
      <a 
        href={`/player/${nick}`} 
        style="text-decoration:none; color:#bfb3b2"
      >
        {nick}
      </a>
    </p>
    </div>
  );
}

  return (
    <>
      <header>
        <h2><a href="" style="font-weight: 700">PHLTV</a></h2>
        <a style="color: white;" href='#'>PHL Статистика</a>
        <a href="">Матчи</a>
        <a href="">Ставки</a>
        <a href="">Трансляция</a>
        <a style="color: rgb(203, 198, 196); cursor: auto; text-shadow: none" href='#'>JHL Статистика</a>
        <video ref={videoRef} style="position:absolute;margin-left:90%;margin-top:-30px" playsinline width="128" height="128" onClick={() => {videoRef.play()}} >
          <source src="poshalka.mp4" type="video/mp4" />
        </video>
      </header>
      <div className="teams">
        <For each={teams()}>
          {(team) => (
            <div className="teamElement">
              <div className="teamLine1">
                <h3>{team.name}</h3>
                <button>Подробнее</button>
              </div>
              <div className="teamPlayers">
                {JSON.parse(team.players).map((player, index) => (
                  <Player key={index} nick={player} />
                ))}
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  )
}

export default App