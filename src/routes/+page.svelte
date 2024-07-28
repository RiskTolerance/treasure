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
    name: 'Intro',
    complete: false,
    started: true,
    title: 'One Last Voyage 🏴‍☠️',
    hint: `<p>Arr, matey. It be time for a good old-fashioned treasure hunt! You really thought your crewmate would just jump ship and leave without one final shenanigan?</p>
           <p>Here's the scoop, me ol' crewmates. I have hidden a treasure for you all. To find it, you must solve a few (mostly easy, probably) puzzles.</p>
           <p>You will be given a clue. To solve it, type the answer into the box below! Simple enough?</p>
           <p>Let's practice! This one be <i>easy</i>.</p>
           <p class="pl-8">"In the dead of night, I glow so bright,<br>Guiding ships with gleaming light.<br>On rocky shores, I stand tall,<br>Preventing wreck amid the squall."</p>`,
    answer: 'lighthouse',
    placeholder: 'What Am I?',
    buttonText: 'Guess!'
  },
  {
    id: 1,
    name: 'Worldbuilding',
    complete: false,
    started: false,
    title: 'The Plot Gains Thickness 🍑',
    hint: `<p>Welcome aboard the sailing ship Truxedo... I guess you've been here for a while, to be fair (shore leave on Saturdays/Sundays).</p>
           <p>Today you've gathered together to mourn the death of your dear crewmate, Isaac. A very sad event, to be sure. He was busy counting the barnacles on the side of the ship (this is an analogy for endplugs) and fell into the sea, never to be seen again (I like to think he's in a better place).</p>
           <p>You gather around a keg of non-alcoholic beer (very illegal) and tell stories about the good ol' days.</p>
           <p>After the party, the crew decides to carry out the time-honored tradition of scouring the dead man's quarters for anything neat they can pilfer (to cherish their crewmate's memory, of course).</p>`,
    answer: 'thatsprettyneat',
    placeholder: 'Well?',
    buttonText: 'Set sail!'
  },
  {
    id: 2,
    name: `Captain's Wheel`,
    complete: false,
    started: false,
    title: `What Can Go Wrong Will Go Wrong`,
    hint: `<p>You decide to start by figuring out where the ship's steering wheel has gone to. After asking around, you are dismayed to find that the troglodyte crew decided the wheel wasn't of much use and threw it out with the shipping pallets.</p>
           <p>To make matters worse, the shipmaker in the town has misplaced his work order instruction detailing how to make ship's wheels (typical).</p>
           <p>There is, however, a faint sliver of hope - you know that the in-house inventory used to stock the work order instruction for a ship's wheel... <i>somewhere</i>.</p>
           <p>Exasperated, you do some additional digging and find out that the instruction was incorrectly labeled as 1118604. Maybe there's still one out there, somewhere?</p>
           <p>It looks like some landlubber named Nicole was the last person to cycle count them....</p>
           <p>The shipmaker isn't totally incompetent - all he needs to know is the sum of the nails and rivets that he will need.</p>`,
    answer: '104',
    placeholder: 'N + R = ?',
    buttonText: 'Submit'
  },
  {
    id: 3,
    name: 'Anchor',
    complete: false,
    started: false,
    title: 'A Fishy Cycle Count',
    hint: `<p>It's time to find the anchor! It turns out that the anchor came loose and fell into the depths of Aquarium Lagoon - you'll have to dive down and retrieve it!</p>
           <p>Luckily for you, there is a small shop in town that sells diving suits. When you ask the shop owner what it will cost to buy the suit, he offers you a trade. He will give you the suit, but you must collect some data for him.</p>
           <p>He would like a number that represents marine diversity in the waters of Aquarium Lagoon (a number which he will sell to local fishermen (data is valuable)).</p>
           <p>Looking in from the 'surface' (aka outside of Aquarium Lagoon (aka outside the window)), he would like to know the result of multiplying the number of mammals, the number of fish, the number of crustaceans, and the number of all other types of creatures added together (shells without obvious inhabitants do not count). You, of course, agree.</p>`,
    answer: '1216',
    placeholder: `M x F x C x O = ?`,
    buttonText: 'Quick Maths!'
  },
  {
    id: 4,
    name: 'Compass',
    complete: false,
    started: false,
    title: 'A Night Shift Nightmare',
    hint: `<p>That night you find yourself at the tavern enjoying a cup of coffee in celebration of finding the anchor without having to Google whether or not a starfish is, in fact, a fish.</p>
           <p>Soon, you are buzzing on the caffeine and become hyper-aware of your surroundings. You notice a large man sitting at the bar, his greased back hair barely covering his balding head. On his belt hangs a compass!</p>
           <p>In a caffeinated stupor, you stumble over and inquire about it. "Oh, this? I don't really need it - I just think it looks cool. If you humor me and solve a riddle, you can have it!"</p>
           <p class="pl-8">"Aye, landlubber, heed my lore,<br>Of pirates bold and factory floor.<br>In the clatter of gears and the ship’s full sail,<br>Both seek a treasure, yet sometimes fail.<br>In the factory’s hum or the ocean’s sway,<br>Something slows us on our way.<br>Pirates or workers, alike we fret,<br>When progress halts, what causes it?<br>Machines may grind and ships may stall,<br>One problem’s the bane of them all.<br>A chokepoint feared, like a pirate’s snare,<br>What be the trouble lurking there?<br>Answer quick, time does tick,<br>The cursed, dreaded... _____________"</p>`,
    answer: 'bottleneck',
    placeholder: 'Hmmmm....',
    buttonText: 'Guess!'
  },
  {
    id: 5,
    name: 'Excel Sea',
    complete: false,
    started: false,
    title: 'The Skies Be Dark And Stormy',
    hint: `<p>You have found all of the parts to the ship!</p><p>Of course, you set sail immediatly.</p><p>As you embark, you notice a group of what looks like people in the water! You feel obligated to help...</p><p>P:\\Public\\E-Systems\\Scheduling\\Isaac\\ExcelSea\\ohno.xlsx</p>`,
    answer: 'mavis',
    placeholder: 'RIP 😔',
    buttonText: 'Onwards!'
  },
  {
    id: 6,
    name: 'END',
    complete: false,
    started: false,
    title: 'Landfall',
    hint: `<p>Finally, you must sail to your final destination. It is time for your final clue!</p><p>lat, long: 42.89192261732324,-97.41103450488997</p><p>In a deep freeze.</p>`,
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
  <ul class="flex flex-col items-center gap-12 opacity-75 absolute left-1/2 -translate-x-1/2 h-full top-20 w-32 z-40">
    {#each clueState as state, i}
      <li class="grid grid-cols-1">
        <div class="block text-center">
          <p> {#if state.started} {state.name} {:else} ??? {/if} </p>
        </div>
        
        <div class="h-8 mx-auto aspect-square rounded-full bg-white flex justify-center items-center">
          {#if state.started && state.complete || i === clueState.length}
            <svg class="stroke-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" ><path d="M20 6 9 17l-5-5"/></svg>
          {/if}
        </div>
      </li>
      <!-- {#if i !== (clueState.length - 1)}
        <div class="h-12 border-r-4 border-green-400"/>
      {/if} -->
    {/each}
  </ul>

  <div style="background-image: url({paperBg});" id="left-pane" class="w-1/2 h-full bg-amber-200 flex flex-col gap-12 items-center bg-cover bg-center overflow-y-scroll scrollbar-left py-12">
    <Hint title={clueState[selectedClue]?.title} hint={clueState[selectedClue]?.hint}/>
    <!-- add some logic here to disable if this is the last clue -->
    <div class="flex justify-start w-2/3 gap-x-2">
      <input class="rounded form-input border-0 focus:ring-0 text-gray-700 text-xl" bind:value={input} type="text" placeholder={clueState[selectedClue]?.placeholder}>
      <button class="text-xl bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"  on:click={checkAnswer}>{clueState[selectedClue]?.buttonText}</button>
    </div>
  </div>
  <div id="right-pane" style="background-image: url({wood});" class="w-1/2 h-full bg-blue-300 flex flex-col justify-center items-center bg-cover relative overflow-clip">

    <Ship />
    <img class="absolute z-20 rotate-90 top-[300px] h-full w-[40px]" src={frame} alt="">
    <img class="absolute z-20 rotate-90 bottom-[300px] h-full w-[40px]" src={frame} alt="">
  </div>
</div>
</div>
