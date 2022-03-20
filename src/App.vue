<template>
	<div id="container">
		<h1>States Game</h1>
		<p>A game where you can guess the 50 US states.</p>
		<hr>
		<button v-if="!gameStarted" @click="startGame">Start Game</button>
		<template v-else>
			<input type="text" autocomplete="off" :disabled="gameOver" v-model="guess" />
			<p>
				<strong>Time remaining:</strong> {{ Math.floor(timer / 60).toString().padStart(2, '0') }}:{{ (timer % 60).toString().padStart(2, '0') }}
			</p>
			<p>
				<strong>States remaining:</strong> {{ available.length }} of {{ states.length }}
			</p>
			<p>
				<strong>Found:</strong> {{ found.join(', ') }}
			</p>
			<template v-if="gameOver">
				<hr>
				<template v-if="gameWon">
					<p id="game-won">
						<strong>You won!</strong>
					</p>
				</template>
				<template v-else>
					<p id="game-over">
						<strong>Game Over!</strong>
					</p>
					<p>
						<strong>Missed:</strong> {{ available.join(', ') }}
					</p>
				</template>
				<p>
					<button @click="startGame">Restart Game</button>
				</p>
			</template>
		</template>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const timeLimit = 600;

export default defineComponent({
	name: 'App',

	data: () => ({
		states,
		guess: '',
		found: [] as string[],
		available: [] as string[],
		message: '',
		gameStarted: false,
		gameOver: false,
		gameWon: false,
		timer: -1,
		timerHandle: -1,
	}),

	methods: {
		startGame() {
			this.found = [];
			this.guess = '';
			this.message = '';
			this.gameWon = false;
			this.gameOver = false;
			this.gameStarted = true;
			this.timer = timeLimit;
			this.available = [...states];
			this.timerHandle = setInterval(() => {
				if (this.timer > 0) {
					this.timer--;
				} else {
					this.endGame();

					clearInterval(this.timerHandle);
				}
			}, 1000);
		},

		endGame() {
			clearInterval(this.timerHandle);
			this.gameOver = true;
			this.gameWon = this.found.length === states.length;
		},
	},

	watch: {
		guess() {
			let normalizedGuess = this.guess.toLowerCase().trim();
			let idx = this.available.map(state => state.toLowerCase()).findIndex(state => state === normalizedGuess);
			if (idx >= 0) {
				let matched = this.available.splice(idx, 1);
				this.found.push(matched[0]);
				this.found.sort();
				this.guess = '';

				if (this.available.length === 0) {
					this.endGame();
				}
			}
		}
	}
});
</script>

<style lang="scss">
html, body {
	box-sizing: border-box;
	font-family: sans-serif;
	margin: 0;
}

#container {
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 40vw;
	min-width: 350px;
}

#game-over {
	color: red;
	font-size: 2em;
}

#game-won {
	color: green;
	font-size: 2em;
}

h1 {
	font-size: 2em;
	margin: 0;
}

p {
	margin: .5em 0;
	text-align: center;
}

hr {
	margin: 1em 0;
	width: 100%;
	border: none;
	border-top: 1px solid #ccc;
}

button, input {
	font-size: 1.25em;
	padding: 0.5em;
	margin: 0.5em;
	display: block;
	border: none;
	border-bottom: 1px solid #ccc;
}

button {
	background: #efefef;
}

input {
	background: #fafafa;
}
</style>
