<template>
	<h1>States Game</h1>
	<p>A game where you can guess the 50 US states.</p>
	<hr>
	<template v-if="!gameStarted">
		<button @click="startGame">Start Game</button>
	</template>
	<template v-else>
		<input type="text" autocomplete="off" :disabled="gameOver" v-model="guess" />
		<p>
			<strong>Found:</strong> {{ found.join(', ') }}
		</p>
		<p>
			<strong>Remaining:</strong> {{ available.length }} of {{ states.length }}
		</p>
		<template v-if="gameOver">
			<template v-if="gameWon">
				<p>
					<strong>You won!</strong>
				</p>
			</template>
			<template>
				<p>
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
		<template v-else>
			<p>
				<strong>Time remaining:</strong> {{ Math.floor(timer / 60).toString().padStart(2, '0') }}:{{ (timer % 60).toString().padStart(2, '0') }}
			</p>
		</template>
	</template>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

export default defineComponent({
	name: 'App',

	data: () => ({
		states,
		guess: '',
		found: [] as string[],
		available: [...states].map(state => state.toLowerCase()),
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
			this.timer = 600;
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
			let normalizedGuess = this.guess.toLowerCase();
			let idx = this.available.findIndex(state => state === normalizedGuess);
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
</style>
