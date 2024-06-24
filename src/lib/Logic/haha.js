let Data = {
	state: 'q0',

	index: {
		tape1: [2, 11],
		tape2: [6, 15],
		tape3: [6, 15],
		tape4: [6, 15],
		tape5: [6, 15]
	},

	tape: {
		tape1: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
		tape2: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
		tape3: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
		tape4: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
		tape5: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
	},

	get: (arrayName, indexName) => {
		if (Data.index[indexName] && Data.tape[arrayName]) {
			let [start, end] = Data.index[indexName];

			if (
				start >= 0 &&
				start < Data.tape[arrayName].length &&
				end >= start &&
				end < Data.tape[arrayName].length
			) {
				return Data.tape[arrayName].slice(start, end + 1);
			} else {
				throw new Error('Invalid index range');
			}
		} else {
			throw new Error('Invalid array name or index name');
		}
	},

	trim: (tapeName) => {
		return Data.tape[tapeName].slice(Data.index[tapeName][0], Data.index[tapeName][1]);
	},

	sleep: (milliseconds) => {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if (new Date().getTime() - start > milliseconds) {
				break;
			}
		}
	},

	shift: (tapeName, option) => {
		if (option == 'right') {
			data.index[tapeName][1]++;
			data.index[tapeName][0]++;
			if (data.index[tapeName][1] >= data.tape[tapeName].length) {
				data.tape[tapeName].push('B');
			}
		} else {
			if (data.index[tapeName][0] == 0) {
				data.tape[tapeName].unshift('B');
			} else {
				data.index[tapeName][1]--;
				data.index[tapeName][0]--;
			}
		}
	},

	change: (tapeName, input) => {
		let middleIndex = Data.index[tapeName][0] + 4;
		data.tape[tapeName][middleIndex] = input;
	},

	checker: (tape) => {
		const tapes = ['tape1', 'tape2', 'tape3', 'tape4', 'tape5'];

		for (let i = 0; i < tapes.length; i++) {
			let middleIndex = data.index[tapes[i]][0] + 4;
			if (!(data.tape[tapes[i]][middleIndex] == tape[i])) {
				return false;
			}
		}

		return true;
	},

	arrow: (tape1, tape2, tape3, tape4, tape5) => {
		return [tape1, tape2, tape3, tape4, tape5];
	},

	countResult: () => {
		const tape5 = Data.tape.tape5;
		let count = 0;

		for (let i = 0; i < tape5.length; i++) {
			if (tape5[i] == 0) {
				count++;
			}
		}

		return count;
	},

	insert: (Mvalue, Nvalue) => {
		Mvalue = parseInt(Mvalue);
		Nvalue = parseInt(Nvalue);

		for (let i = 0; i < Mvalue; i++) {
			Data.tape.tape1.splice(6 + i, 0, 0);
		}

		Data.tape.tape1.splice(6 + Mvalue, 0, 1);

		for (let i = 0; i < Nvalue; i++) {
			Data.tape.tape1.splice(6 + Mvalue + i + 1, 0, 0);
		}

		Data.tape.tape1.splice(6 + Mvalue + Nvalue + 1, 0, 1);
	},

	reset: () => {
		for (let i = 0; i < 5; i++) {
			Data.tape[i] = [
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B',
				'B'
			];
		}

		Data.index.tape1 = [2, 11];

		for (let i = 1; i < 5; i++) {
			Data.index[i] = [6, 15];
		}
	},

	q0: () => {
		if (data.checker([0, 'B', 'B', 'B', 'B'])) {
			data.change('tape2', 0);
			data.shift('tape1', 'right');
			data.shift('tape2', 'right');
			data.state = 'q0';
			return data.arrow('right', 'right', 'stop', 'stop', 'stop');
		} else if (data.checker([1, 'B', 'B', 'B', 'B'])) {
			data.shift('tape1', 'left');
			data.shift('tape2', 'left');
			data.state = 'q1';
			return data.arrow('left', 'left', 'stop', 'stop', 'stop');
		}
	},

	q1: () => {
		if (data.checker([0, 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'left');
			data.shift('tape2', 'left');
			data.state = 'q1';
			return data.arrow('left', 'left', 'stop', 'stop', 'stop');
		} else if (data.checker(['B', 'B', 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.shift('tape2', 'right');
			data.state = 'q2';
			return data.arrow('right', 'right', 'stop', 'stop', 'stop');
		}
	},

	q2: () => {
		if (data.checker([0, 0, 'B', 'B', 'B'])) {
			data.change('tape1', 'B');
			data.shift('tape1', 'right');
			data.state = 'q3';
			return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
		} else if (data.checker([1, 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q7';
			return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
		} else if (data.checker([1, 'B', 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q13';
			return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
		}
	},

	q3: () => {
		if (data.checker([0, 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q3';
		} else if (data.checker([1, 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q4';
		}
		return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
	},

	q4: () => {
		if (data.checker(['X', 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q4';
			return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
		} else if (data.checker([1, 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q6';
			return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
		} else if (data.checker([0, 0, 'B', 'B', 'B'])) {
			data.change('tape1', 'X');
			data.shift('tape1', 'left');
			data.state = 'q5';
			return data.arrow('left', 'stop', 'stop', 'stop', 'stop');
		}
	},

	q5: () => {
		if (
			data.checker(['1', 0, 'B', 'B', 'B']) ||
			data.checker(['X', 0, 'B', 'B', 'B']) ||
			data.checker([0, 0, 'B', 'B', 'B'])
		) {
			data.shift('tape1', 'left');
			data.state = 'q5';
			return data.arrow('left', 'stop', 'stop', 'stop', 'stop');
		} else if (data.checker(['B', 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q2';
			return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
		}
	},

	q6: () => {
		if (data.checker([0, 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q6';
			return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
		} else if (data.checker(['B', 0, 'B', 'B', 'B'])) {
			data.change('tape1', 0);
			data.shift('tape1', 'left');
			data.state = 'q5';
			return data.arrow('left', 'stop', 'stop', 'stop', 'stop');
		}
	},

	q7: () => {
		if (data.checker(['X', 0, 'B', 'B', 'B'])) {
			data.shift('tape1', 'right');
			data.state = 'q7';
			return data.arrow('right', 'stop', 'stop', 'stop', 'stop');
		} else if (data.checker([1, 0, 'B', 'B', 'B'])) {
			data.change('tape3', 0);
			data.change('tape4', 0);
			data.shift('tape1', 'right');
			data.shift('tape2', 'right');
			data.shift('tape3', 'right');
			data.state = 'q8';
			return data.arrow('right', 'right', 'right', 'stop', 'stop');
		} else if (data.checker([0, 0, 'B', 'B', 'B'])) {
			data.state = 'qe';
			return data.arrow('stop', 'stop', 'stop', 'stop', 'stop');
		}
	},

	q8: () => {
		if (data.checker([0, 0, 'B', 0, 'B'])) {
			data.change('tape3', 0);
			data.shift('tape1', 'right');
			data.shift('tape2', 'right');
			data.shift('tape3', 'right');
			data.state = 'q8';
			return data.arrow('right', 'right', 'right', 'stop', 'stop');
		} else if (data.checker(['B', 0, 'B', 0, 'B']) || data.checker(['B', 'B', 'B', 0, 'B'])) {
			data.shift('tape2', 'left');
			data.shift('tape3', 'left');
			data.state = 'q9';
			return data.arrow('stop', 'left', 'left', 'stop', 'stop');
		} else if (data.checker([0, 'B', 'B', 0, 'B'])) {
			data.change('tape5', 0);
			data.state = 'qf';
			return data.arrow('stop', 'stop', 'stop', 'stop', 'stop');
		}
	},

	q9: () => {
		if (data.checker(['B', 0, 0, 0, 'B'])) {
			data.shift('tape2', 'left');
			data.shift('tape3', 'left');
			data.state = 'q9';
			return data.arrow('stop', 'left', 'left', 'stop', 'stop');
		} else if (data.checker(['B', 'B', 'B', 0, 'B'])) {
			data.shift('tape2', 'right');
			data.shift('tape3', 'right');
			data.state = 'q10';
			return data.arrow('stop', 'right', 'right', 'stop', 'stop');
		}
	},

	q10: () => {
		if (data.checker(['B', 0, 0, 0, 'B'])) {
			data.change('tape5', 0);
			data.shift('tape4', 'right');
			data.shift('tape5', 'right');
			data.state = 'q10';
			return data.arrow('stop', 'stop', 'stop', 'right', 'right');
		} else if (data.checker(['B', 0, 0, 'B', 'B'])) {
			data.shift('tape4', 'left');
			data.state = 'q11';
			return data.arrow('stop', 'stop', 'stop', 'left', 'stop');
		} else if (data.checker(['B', 0, 'B', 'B', 'B'])) {
			data.change('tape3', 0);
			data.shift('tape5', 'left');
			data.state = 'q12';
			return data.arrow('stop', 'stop', 'stop', 'stop', 'left');
		} else if (data.checker(['B', 0, 'B', 0, 'B'])) {
			data.change('tape4', 'B');
			data.shift('tape4', 'right');
			data.state = 'q10';
			return data.arrow('stop', 'stop', 'stop', 'right', 'stop');
		} else if (data.checker(['B', 'B', 'B', 0, 'B'])) {
			data.state = 'qf';
			return data.arrow('stop', 'stop', 'stop', 'stop', 'stop');
		}
	},

	q11: () => {
		if (data.checker(['B', 0, 0, 0, 'B'])) {
			data.shift('tape4', 'left');
			data.state = 'q11';
			return data.arrow('stop', 'stop', 'stop', 'left', 'stop');
		} else if (data.checker(['B', 0, 0, 'B', 'B'])) {
			data.shift('tape2', 'right');
			data.shift('tape3', 'right');
			data.shift('tape4', 'right');
			data.state = 'q10';
			return data.arrow('stop', 'right', 'right', 'right', 'stop');
		}
	},

	q12: () => {
		if (data.checker(['B', 0, 0, 'B', 0])) {
			data.change('tape4', 0);
			data.change('tape5', 'B');
			data.shift('tape2', 'left');
			data.shift('tape3', 'left');
			data.shift('tape4', 'left');
			data.shift('tape5', 'left');
			data.state = 'q12';
			return data.arrow('stop', 'left', 'left', 'left', 'left');
		} else if (data.checker(['B', 'B', 'B', 'B', 0])) {
			data.change('tape4', 0);
			data.change('tape5', 'B');
			data.shift('tape4', 'left');
			data.shift('tape5', 'left');
			data.state = 'q12';
			return data.arrow('stop', 'stop', 'stop', 'left', 'left');
		} else if (data.checker(['B', 0, 0, 'B', 'B'])) {
			data.shift('tape2', 'left');
			data.shift('tape3', 'left');
			data.state = 'q12';
			return data.arrow('stop', 'left', 'left', 'stop', 'stop');
		} else if (data.checker(['B', 'B', 'B', 'B', 'B'])) {
			data.shift('tape2', 'right');
			data.shift('tape3', 'right');
			data.shift('tape4', 'right');
			data.shift('tape5', 'right');
			data.state = 'q10';
			return data.arrow('stop', 'right', 'right', 'right', 'stop');
		}
	},

	q13: () => {
		if (data.checker([0, 'B', 'B', 'B', 'B'])) {
			data.state = 'qe';
			return data.arrow('stop', 'stop', 'stop', 'stop', 'stop');
		} else if (data.checker([1, 'B', 'B', 'B', 'B'])) {
			data.change('tape5', 0);
			data.state = 'qf';
			return data.arrow('stop', 'stop', 'stop', 'stop', 'stop');
		}
	},

	next: () => {
		switch (data.state) {
			case 'q0':
				return data.q0();

			case 'q1':
				return data.q1();

			case 'q2':
				return data.q2();

			case 'q3':
				return data.q3();

			case 'q4':
				return data.q4();

			case 'q5':
				return data.q5();

			case 'q6':
				return data.q6();

			case 'q7':
				return data.q7();

			case 'q8':
				return data.q8();

			case 'q9':
				return data.q9();

			case 'q10':
				return data.q10();

			case 'q11':
				return data.q11();

			case 'q12':
				return data.q12();

			case 'q13':
				return data.q13();

			default:
		}
	}
};

export let data = Data;
