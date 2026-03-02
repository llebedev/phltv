/* @refresh reload */
import { render } from 'solid-js/web'
import '../App.css'
import { Meter } from "@kobalte/core/meter";
import { createSignal, onMount, createEffect, lazy, Show } from "solid-js";
import { useParams } from '@solidjs/router';


const root = document.getElementById('root')

const [player, setPlayer] = createSignal(null);
const [loading, setLoading] = createSignal(true);
 const [team, setTeam] = createSignal([]);

export default function Player() {
    const nick = useParams().nick;
    let videoRef;
    let rateRef;
    let meterRef;
    const headUrl = `https://mc-heads.net/avatar/${encodeURIComponent(nick)}/64`;

    onMount(async () => {
        try {
            const res = await fetch("http://localhost:3001/player/" + nick);
            const data = await res.json();

            await setPlayer(data);
            
            console.log("http://localhost:3001/team/" + player()[0].team);
            const res2 = await fetch("http://localhost:3001/team/" + player()[0].team);
            const data2 = await res2.json();

            console.log(data2);
            
            const teamData = data2 ? {
                ...data2,
                players: JSON.parse(data2.players || "[]")  
            } : null;

            setTeam(teamData);

        } finally {

            setLoading(false);
        }


        if (player()[0].rate > 2.0) {
            rateRef.style.color = "#02bc68";
            meterRef.style.backgroundColor = "#02bc68";
        } else if (player()[0].rate < 1.0) {
            rateRef.style.color = "#880000";
            meterRef.style.backgroundColor = "#880000";
        } else if (player()[0].rate > 3.0) {
            rateRef.style.color = "#36c909";
            meterRef.style.backgroundColor = "#36c909";
        }
    });
    return (
        <>
            <Show when={!loading()}>
                <header>
                    <h2><a href="/" style="font-weight: 700">PHLTV</a></h2>
                    <a style="color: white;" href='#'>PHL Статистика</a>
                    <a href="">Матчи</a>
                    <a href="">Ставки</a>
                    <a href="">Трансляция</a>
                    <a style="color: rgb(203, 198, 196); cursor: auto; text-shadow: none" href='#'>JHL Статистика</a>
                    <video ref={videoRef} style="position:absolute;margin-left:90%;margin-top:-30px" playsinline width="128" height="128" onClick={() => { videoRef.play() }} >
                        <source src="/poshalka.mp4" type="video/mp4" />
                    </video>
                </header>
                    <div className="playerITitle">
                        <img src={headUrl} alt="" width="64px" height="64px" />
                        <h1>{nick}</h1>
                        <p> ({player()[0].team})</p>
                    </div>
                <div className="playerI">
                    <p className='playerRole'> {player()[0].role}</p>
                   <p ref={rateRef}>{player()[0].rate}</p>
                    <Meter value={player()[0].rate * 25} class="meter">
                        <div class="meter__label-container">
                            <Meter.Label class="meter__label">Rating:</Meter.Label>
                            <Meter.ValueLabel class="meter__value-label" />
                        </div>
                        <Meter.Track class="meter__track">
                            <Meter.Fill ref={meterRef} class="meter__fill" />
                        </Meter.Track>
                    </Meter>
                </div>
                <div className="matches">
                    <h1>Матчи: </h1>
                    <div className="matchElement">
                        <p>2026-02-16</p>
                        <div className="matchLine1">
                            <h3>PEPElivery Mascots VS Eternal Pantheon</h3>
                            <div className="logos">
                                <img src="/logo1.png" width="64" height="64" alt="" />
                                <p>VS</p>
                                <img src="/logo2.png" width="64" height="64" alt="" />
                            </div>
                        </div>
                        <For each={team().players}>
                            {(playerNick) => (
                            <div>
                                <a style="text-decoration:none; color:#bfb3b2;font-size:18px" href={`/player/${playerNick}`}>{playerNick}</a>
                            </div>
                            )}
                        </For>
                        <div className="matchResult">
                            <p>ПОБЕДА</p>
                        </div>
                    </div>
                </div>
            </Show>

        </>
    )
}
