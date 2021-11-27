import { Pitch } from './Pitch';
import { Tone } from './Tone';

export interface Note {
	octave: number;
	tone: Tone;
	pitch: Pitch;
}
