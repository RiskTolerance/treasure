<script lang="ts">
  import Hint from '$lib/components/Hint.svelte';
	import Ship from '$lib/components/Ship.svelte';
  import paperBg from '$lib/img/paper.webp';
  import wood from '$lib/img/wood.webp';
  import frame from '$lib/img/frame.webp';

  let selectedClue = 0;
  let input = '';
  let errorMessage = '';
  let scrollableArea: HTMLElement | null = null;

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
    hint: `<p>Finally, you must sail to your final destination. It is time for your final clue!</p><p>42°53'30.9"N 97°24'39.7"W</p><p>In a deep freeze.</p>`,
    answer: '',
    placeholder: '',
    buttonText: ''
  },
]


  const checkAnswer = () => {
    if (input.trim().toLowerCase().replace(/[^a-z0-9]/g,'') === clueState[selectedClue]?.answer) {
      clueState[selectedClue].complete = true;
      if (clueState[selectedClue + 1]) {
        input = '';
        errorMessage = '';
        if (scrollableArea) {
          scrollableArea.scrollTop = 0;
        }
        selectedClue += 1;
        console.log(selectedClue);
        clueState[selectedClue].started = true;
      } else {
        input = '';
      }
    } else {
      input = '';
      errorMessage = 'Wrong answer, try again!';
    }
  }
  const handleKeyPress = (e:KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  }
</script>

<div class="w-screen min-w-[1500px] h-screen flex justify-center items-center bg-slate-700">
  <div id="page-container" class="h-[900px] w-[1400px] flex relative font-serif text-2xl text-gray-800 overflow-clip">
  <img class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-32" src={frame} alt="">
  <ul class="flex flex-col items-center gap-12 opacity-75 absolute left-1/2 -translate-x-1/2 h-full top-20 w-32 z-40">
    {#each clueState as state, i}
      <li class="grid grid-cols-1">
        <div class="block text-center">
          <p> {#if state.started} {state.name} {:else} ??? {/if} </p>
        </div>
        
        <div class="h-8 mx-auto aspect-square rounded-full bg-white flex justify-center items-center">
          {#if state.started && state.complete && i !== 6}
            <svg class="stroke-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" ><path d="M20 6 9 17l-5-5"/></svg>
          {/if}
          {#if selectedClue === 6 && i === 6}
            <svg class="fill-yellow-700 h-3/4" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 95.8 122.9">
              <path fill-rule="evenodd" d="M5.2 74.4h1.2l.1-.2a13.3 13.3 0 0 1 3.9-6.2c.6-.5 1.2-1 2-1.3a14.8 14.8 0 0 1 1-4.9h-3L5.2 74.4zm84.2 0h1.4l-4.6-12.6h-3.9l.4 1c.4 1.2.7 2.5.8 3.9.7.3 1.3.8 2 1.3a11.8 11.8 0 0 1 3.2 4.5c.3.6.5 1.2.6 1.9zm5.4.4c.6.4 1 1.1 1 1.9v43.1a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-43c0-.8.4-1.5 1-2l6.2-14.9L.8 33.4v-.6A18.5 18.5 0 0 1 6 21c1.3-1.3 14.2-7.6 25.4-13L46.7.1c.6-.3 1.4-.3 2 0 3.2 2 13.5 6.8 23 11.3a282 282 0 0 1 18.6 9.2c1.8 1.7 3.1 3.5 4 5.6.7 2 1 4.3.7 7l-5.6 26.5 5.4 15zm-38.1 1.4h-18v10.4a9 9 0 0 0 17.9 0V76.2zm-24-21a11 11 0 0 1 3-1.4 10.7 10.7 0 0 1 5-.1 47 47 0 0 1 7.8 2.4 21 21 0 0 1 6.6-2.4h.1a9.5 9.5 0 0 1 5 .1 10 10 0 0 1 2.9 1.4 14.7 14.7 0 0 1 15.2 1.4l1.6 1.5h6l5.4-25.4c.2-1.9 0-3.5-.6-5s-1.6-3-3-4.2A498 498 0 0 0 70 14.9L47.6 4l-14.5 7.2A379.7 379.7 0 0 0 8.7 23.5a14.7 14.7 0 0 0-4.2 9.4L10.6 58H16a13.1 13.1 0 0 1 6.6-4 14.5 14.5 0 0 1 10.3 1zm2.6 2.7a5 5 0 0 0-1 .8c-.7.6-1.7.7-2.4.2-.9-.6-1.9-1-3-1.2a11.3 11.3 0 0 0-5.4 0 10.5 10.5 0 0 0-5.2 3.2 11.6 11.6 0 0 0-2.4 6.9c.1.8-.4 1.6-1.2 1.9-.7.2-1.3.6-2 1.1a8 8 0 0 0-1.6 2l-.1.2h73.8l-.1-.2c-.5-.8-1-1.4-1.7-2a6 6 0 0 0-2-1.1c-.6-.3-1.2-1-1.2-1.8 0-1.4-.2-2.7-.6-3.8a9.7 9.7 0 0 0-6.9-6.4 10.6 10.6 0 0 0-5.4 0c-1 .2-2 .6-2.9 1.2-.7.5-1.8.5-2.4-.2a6.3 6.3 0 0 0-4-1.6l-1.5.1h-.2c-1.8.5-7 3-7.3 3-.5 0-.8-.2-1.1-.4-.2-.2-.9-.8-7.6-2.5a6.3 6.3 0 0 0-4.6.6zm-10-28h-.2c0 2.4-.9 4.4-2.6 6.2a8.4 8.4 0 0 1-6.2 2.6v.3c2.4 0 4.4.9 6.2 2.6a8.4 8.4 0 0 1 2.6 6.2h.3c0-2.4.9-4.4 2.6-6.2a8.4 8.4 0 0 1 6.2-2.6v-.3c-2.4 0-4.4-.9-6.2-2.6a8.4 8.4 0 0 1-2.6-6.2zm35.5-11c0 1.1-.5 2-1.3 2.9a4 4 0 0 1-2.8 1.2v.1c1 0 2 .4 2.8 1.2.3.3 1.3 2.8 1.3 2.8 0-1 .4-2 1.3-2.8.8-.8 1.7-1.2 2.8-1.2V23c-1.1 0-2-.4-2.9-1.2a3.9 3.9 0 0 1-1.2-2.9zm8.8 11h-.3c0 2.4-.9 4.4-2.6 6.2a8.4 8.4 0 0 1-6.2 2.6v.3c2.4 0 4.4.9 6.2 2.6a8.4 8.4 0 0 1 2.6 6.2h.3c0-2.4.9-4.4 2.6-6.2a8.4 8.4 0 0 1 6.2-2.6v-.3c-2.4 0-4.4-.9-6.2-2.6a8.5 8.5 0 0 1-2.6-6.2zM37 18.3h-.2c0 1-.4 2-1.2 2.8-.8.8-1.7 1.2-2.8 1.2v.2c1 0 2 .4 2.8 1.2.8.8 1.2 1.7 1.2 2.8h.2c0-1 .4-2 1.2-2.8.8-.8 1.7-1.2 2.8-1.2v-.2c-1 0-2-.4-2.8-1.2a3.8 3.8 0 0 1-1.2-2.8zm9.4 9.6h-.2A7 7 0 0 1 44 33a7.1 7.1 0 0 1-5.2 2.2v.3c2 0 3.7.7 5.1 2.2a7.1 7.1 0 0 1 2.3 5.2h.2a7 7 0 0 1 2.2-5.2 7.1 7.1 0 0 1 5.2-2.2v-.3a7 7 0 0 1-5.2-2.2 7 7 0 0 1-2.2-5.1zm-1.8 55h6v3.4a3 3 0 0 1-3 3 3 3 0 0 1-3-3v-3.4zM81 119.6h10.8c.4 0 .7-.4.7-.8v-10.5h-.4c-6.1 0-11.1 5-11.1 11.2zm-66.1 0H4a.8.8 0 0 1-.8-.8v-10.5h.4c6.2 0 11.2 5 11.2 11.2z" clip-rule="evenodd"/>
            </svg>
          {/if}
        </div>
      </li>
    {/each}
  </ul>

  <div bind:this={scrollableArea} style="background-image: url({paperBg});" id="left-pane" class="w-1/2 h-full bg-amber-200 flex flex-col gap-12 items-center bg-cover bg-center overflow-y-scroll scrollbar-left py-12">
    <Hint title={clueState[selectedClue]?.title} hint={clueState[selectedClue]?.hint}/>
    <!-- add some logic here to disable if this is the last clue -->
  {#if selectedClue !== 6}
    <div class="flex justify-start w-2/3 gap-x-2 relative">
      <p class="absolute -top-6 left-2 text-sm">{errorMessage}</p>
      <input class="rounded form-input border-0 focus:ring-0 text-gray-700 text-xl" on:keypress={handleKeyPress} bind:value={input} type="text" placeholder={clueState[selectedClue]?.placeholder}>
      <button class="text-xl bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded" on:click={checkAnswer}>{clueState[selectedClue]?.buttonText}</button>
    </div>
  {/if}
    
  </div>
  <div id="right-pane" style="background-image: url({wood});" class="w-1/2 h-full bg-blue-300 flex flex-col justify-center items-center bg-cover relative overflow-clip">
    <Ship />
    <img class="absolute z-20 rotate-90 top-[300px] h-full w-[40px]" src={frame} alt="">
    <img class="absolute z-20 rotate-90 bottom-[300px] h-full w-[40px]" src={frame} alt="">
  </div>
</div>
</div>
