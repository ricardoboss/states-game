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
		<hr>
		<span>
			<label>
				Show live graph:
				<input type="checkbox" v-model="showLiveChart">
			</label>
		</span>
		<line-chart v-if="showLiveChart || gameOver" id="chart" :chartData="foundChartData" :options="chartOptions"></line-chart>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
	CategoryScale,
	Chart,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from "chart.js";
import {LineChart} from "vue-chart-3";

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip);

const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const timeLimit = 600;

interface FoundAtEntry {
	timestamp: number;
	state: string;
}

export default defineComponent({
	name: 'App',
	components: {LineChart},
	data: () => ({
		states,
		guess: '',
		found: [] as string[],
		foundAt: [] as FoundAtEntry[],
		available: [] as string[],
		message: '',
		gameStarted: false,
		gameOver: false,
		gameWon: false,
		timer: -1,
		timerHandle: -1,
		showLiveChart: false,
		chartOptions: {
			responsive: true,
			interaction: {
				mode: 'index',
				intersect: false,
			},
			stacked: false,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'States guessed per second',
				},
			},
			scales: {
				y: {
					type: 'linear',
					display: true,
					position: 'left',
				},
				y1: {
					type: 'linear',
					display: true,
					position: 'right',
					grid: {
						drawOnChartArea: false, // only want the grid lines for one axis to show up
					},
				},
			}
		}
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
			window.onbeforeunload = (e) => {
				e.preventDefault();
				e.returnValue = "Your progress will not be saved. Are you sure you want to leave?";
			};
		},

		endGame() {
			window.onbeforeunload = null;
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
				this.foundAt.push({timestamp: this.timer, state: matched[0]});
				this.guess = '';

				if (this.available.length === 0) {
					this.endGame();
				}
			}
		}
	},

	computed: {
		foundChartData() {
			let points = [];
			let statesPerSecond = 0;
			let averageStatesPerSecond = 0;
			let lastTimestamp = 0;
			let stateCount = 1;
			let averageWeight = 0.9;
			for (let timestamp of this.foundAt.map(entry => timeLimit - entry.timestamp)) {
				if (lastTimestamp > 0) {
					statesPerSecond = (stateCount - 1) / timestamp;
					averageStatesPerSecond = averageWeight * averageStatesPerSecond + (1 - averageWeight) * statesPerSecond;
				}

				points.push({timestamp, statesPerSecond, averageStatesPerSecond, stateCount});
				stateCount++;
				lastTimestamp = timestamp;
			}

			// throw away first measurement
			points.shift();

			return {
				labels: [...Array(timeLimit - this.timer).keys()].map(i => i + 1).slice(1),
				datasets: [
					{
						label: 'Average States Per Second',
						data: points.map(point => {
							return {x: point.timestamp, y: point.averageStatesPerSecond};
						}),
						borderColor: '#3c8',
						tension: 0.2,
					},
					{
						label: 'Raw States Per Second',
						data: points.map(point => { return {x: point.timestamp, y: point.statesPerSecond}; }),
						borderColor: '#aaaaaa99',
						tension: 0.1,
					},
					{
						label: 'Total States Found',
						data: points.map(point => { return {x: point.timestamp, y: point.stateCount}; }),
						borderColor: '#dd9999aa',
						tension: 0.1,
						yAxisID: 'y1',
					},
				]
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
	min-width: 400px;
}

#game-over {
	color: red;
	font-size: 2em;
}

#game-won {
	color: green;
	font-size: 2em;
}

#chart {
	width: 100%;
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

button, input[type='text'] {
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
