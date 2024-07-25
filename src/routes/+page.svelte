<script lang="ts">
  import Hint from '$lib/components/Hint.svelte';
	import Ship from '$lib/components/Ship.svelte';
  import paperBg from '$lib/img/paper.webp';
  import wood from '$lib/img/wood.webp';
  import frame from '$lib/img/frame.webp';
	import type { PageData } from './$types';
  export let data: PageData;

  let selectedClue = 0;
  let input = '';

  type Clue = {
    id: number,
    name: string,
    complete: boolean,
    started: boolean,
    title: string,
    hint: string,
    answer: string,
    placeholder: string,
    buttonText: string
  }

  const clueState: Clue[] = [
    {
      id: 0,
      name: 'intro',
      complete: false,
      started: true,
      title: 'One Last Voyage 🏴‍☠️',
      hint: `<p>Arr, matey. It be time for a good old-fashioned treasure hunt! You really thought your crewmate would just jump ship and leave without one final shenanigan?<p><p>Here's the scoop, me ol' crewmates. I have hidden a treasure for you all. To find it, you must solve a few (mostly easy, probably) puzzles.</p><p>You will be given a clue. To solve it, type the answer into the box below! Simple enough?</p><p>Let's practice! This one be <i>easy</i>.</p><p class="pl-8">"In the dead of night, I glow so bright,<br>Guiding ships with gleaming light.<br>On rocky shores, I stand tall,<br>Preventing wreck amid the squall."</p>`,
      answer: 'lighthouse',
      placeholder: 'What Am I?',
      buttonText: 'Guess!'
    },
    {
      id: 1,
      name: 'worldbuilding',
      complete: false,
      started: false,
      title: 'The Plot Gains Thickness 🍑',
      hint: `<p>Welcome abord the sailing ship Truxedo... I guess you've been here for a while, to be fair (shore leave on Saturdays/Sundays).<br>Today you've gathered together to mourn the death of your dear crewmate, Isaac. A very sad event, to be sure. He was busy counting the barnicles on the side of the ship (this is an analogy for endplugs) and fell into the sea, never to be seen again (I like to think he's in a better place).<br>You gather around a keg of non-alcoholic beer (very illegal) and tell stories about the good ol' days.<br>After the party, the crew decides to carry out the time-honored tradition of scouring the dead man's quarters for anything neat they can pilfer (to cherish their crewmate's memory, of course).</p>`,
      answer: 'thatsprettyneat',
      placeholder: 'Well, find anything?',
      buttonText: 'Set sail!'
    },
    // Hello, my dear frieds. If you are reading this I am sure that you have honored the time-honored tradition of looking though my quarters for anything that remains. While you may be disappointed thus far, I have good news. I have left for you a treasure of great value. There are some things you will need to do before setting out, though. The ship has fallen into disarray, and to find the treasure you must cross the dreaded Excel Sea. Before setting off you must find some parts for your ship! You will need: a steering wheel, a rudder, a sail, an anchor, a compass, and a mascot. I'm sure they won't be hard to find at all. If you search diligently, I'm sure you'll find my buried treasure! howneatisthat?! 
    {
      id: 3,
      name: `Captain's Wheel`,
      complete: false,
      started: false,
      title: `Captain's Wheel`,
      hint: `<p>After mulling it over, you decide to go ask the Captain where the ship's steering wheel has gone to. </p>`,
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 4,
      name: 'anchor',
      complete: false,
      started: false,
      title: 'Anchor',
      hint: '<p></p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 5,
      name: 'compass',
      complete: false,
      started: false,
      title: '',
      hint: '<p></p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 6,
      name: 'sail',
      complete: false,
      started: false,
      title: '',
      hint: '<p></p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 7,
      name: 'mascot',
      complete: false,
      started: false,
      title: '',
      hint: '<p></p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 8,
      name: 'mascot',
      complete: false,
      started: false,
      title: '',
      hint: '<p></p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 9,
      name: 'mascot',
      complete: false,
      started: false,
      title: '',
      hint: '<p></p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
  ]

  const checkAnswer = () => {
    if (input.trim().toLowerCase().replace(/\s/g,'') === clueState[selectedClue]?.answer) {
      clueState[selectedClue].complete = true;
      if (clueState[selectedClue + 1]) {
        input = '';
        selectedClue += 1;
        clueState[selectedClue].started = true;
      }
    }
  }
</script>

<div class="w-screen h-screen flex justify-center items-center bg-slate-700">
  <div id="page-container" class="h-[900px] w-[1400px] flex relative font-serif text-2xl text-gray-800 overflow-clip">
  <img class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-32" src={frame} alt="">
  <ul class="flex flex-col items-center gap-12 opacity-75 absolute left-1/2 -translate-x-1/2 h-full top-20 w-96 z-40">
    {#each clueState as state, i}
      <li class="grid grid-cols-2 gap-2">
        <div class="flex items-center">
          <p> {#if state.started} {state.name} {:else} ??? {/if} </p>
        </div>
        
        <div class="h-8 aspect-square rounded-full bg-white flex justify-center items-center">
          {#if state.started && state.complete}
            <svg class="stroke-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" ><path d="M20 6 9 17l-5-5"/></svg>
          {/if}
        </div>
      </li>
      <!-- {#if i !== (clueState.length - 1)}
        <div class="h-12 border-r-4 border-green-400"/>
      {/if} -->
    {/each}
  </ul>

  <div style="background-image: url({paperBg});" id="left-pane" class="w-1/2 h-full bg-amber-200 flex flex-col gap-12 justify-center items-center bg-cover bg-center overflow-y-scroll py-12">
    <Hint title={clueState[selectedClue]?.title} hint={clueState[selectedClue]?.hint}/>
    <div class="flex justify-start w-2/3 gap-x-2">
      <input class="rounded form-input border-0 focus:ring-0 text-gray-700 text-xl" bind:value={input} type="text" placeholder={clueState[selectedClue]?.placeholder}>
      <button class="text-xl bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"  on:click={checkAnswer}>{clueState[selectedClue]?.buttonText}</button>
    </div>
  </div>
  <div id="right-pane" style="background-image: url({wood});" class="w-1/2 h-full bg-blue-300 flex flex-col justify-center items-center bg-cover relative overflow-clip">

    <Ship />
    <img class="absolute z-20 rotate-90 top-1/3 h-full w-[40px]" src={frame} alt="">
    <img class="absolute z-20 rotate-90 bottom-1/3 h-full w-[40px]" src={frame} alt="">
  </div>
</div>
</div>
