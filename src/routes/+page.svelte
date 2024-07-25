<script lang="ts">
  import Hint from '$lib/components/Hint.svelte';
	import Ship from '$lib/components/Ship.svelte';
  import paperBg from '$lib/img/paper.webp';
  export let data;

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
      hint: '<p>Welcome abord the sailing ship Truxedo.</p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 3,
      name: 'wheel',
      complete: false,
      started: false,
      title: '',
      hint: '<p></p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 4,
      name: 'wheel',
      complete: false,
      started: false,
      title: '',
      hint: '<p></p>',
      answer: '',
      placeholder: '',
      buttonText: ''
    },
    {
      id: 5,
      name: 'wheel',
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
      name: 'wheel',
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
      name: 'wheel',
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
    if (input.trim().toLowerCase() === clueState[selectedClue]?.answer) {
      clueState[selectedClue].complete = true;
      if (clueState[selectedClue + 1]) {
        selectedClue += 1;
        clueState[selectedClue].started = true;
      }
    }
  }
</script>

<div id="page-container" class="w-screen h-screen overflow-scroll flex relative font-serif text-2xl text-gray-800">

  <ul class="flex flex-col items-center gap-2 absolute left-[calc(50%-12rem)] top-20 w-96">
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
      {#if i !== (clueState.length - 1)}
        <div class="h-12 border-r-4 border-green-400"/>
      {/if}
    {/each}
  </ul>

  <div style="background-image: url({paperBg});" id="left-pane" class="w-1/2 h-full bg-amber-200 flex flex-col gap-12 justify-center items-center bg-cover bg-center">
    <Hint title={clueState[selectedClue]?.title} hint={clueState[selectedClue]?.hint}/>
    <div class="flex justify-start w-2/3 gap-x-2">
      <input class="rounded form-input border-0 focus:ring-0 text-gray-700 text-xl" bind:value={input} type="text" placeholder={clueState[selectedClue]?.placeholder}>
      <button class="text-xl bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"  on:click={checkAnswer}>{clueState[selectedClue]?.buttonText}</button>
    </div>
  </div>
  <div id="right-pane" class="w-1/2 h-full bg-blue-300 flex flex-col justify-center items-center">
    <Ship />
  </div>
</div>