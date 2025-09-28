// --- UI ELEMENTS ---
const startButton = document.getElementById('start-button');
const statusMessage = document.getElementById('status-message');
const noteNameEl = document.getElementById('note-name');
const frequencyEl = document.getElementById('frequency-display');
const tunerDisplay = document.getElementById('tuner-display');
const tunerPointer = document.getElementById('tuner-pointer');
const stringButtons = document.querySelectorAll('.string-button');
const vuMeterContainer = document.getElementById('vu-meter-container');
const vuMeterBar = document.getElementById('vu-meter-bar');
const generateProgressionBtn = document.getElementById('generate-progression');
const chordProgressionDisplayArea = document.getElementById('chord-progression-display-area');
const chordDiagramsOutput = document.getElementById('chord-diagrams-output');
const visualizeScaleBtn = document.getElementById('visualize-scale');
const startMetronomeBtns = document.querySelectorAll('.start-metronome-btn');
const bpmSliders = document.querySelectorAll('.bpm-slider');
const bpmDisplays = document.querySelectorAll('.bpm-display');
const timeSignatureSelects = document.querySelectorAll('.time-signature-select');
const backingTrackSelects = document.querySelectorAll('.backing-track-select');
const metronomeIndicators = document.querySelectorAll('.metronome-indicator');
const mainTunerView = document.getElementById('main-tuner-view');
const scaleVisualizerView = document.getElementById('scale-visualizer-view');
const backToTunerBtn = document.getElementById('back-to-tuner-btn');
const scaleKeyVisualizer = document.getElementById('scale-key-visualizer');
const scaleTypeVisualizer = document.getElementById('scale-type-visualizer');
const mirrorFretboardBtn = document.getElementById('mirror-fretboard');
const fretboardContainer = document.getElementById('fretboard-container');
const fretboardEl1 = document.getElementById('fretboard-1');
const fretNumbersEl1 = document.getElementById('fret-numbers-1');
const fretboardEl2 = document.getElementById('fretboard-2');
const fretNumbersEl2 = document.getElementById('fret-numbers-2');
const permissionModal = document.getElementById('permission-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const retryMicBtn = document.getElementById('retry-mic-btn');

// --- CONFIG & DATA ---
const tuning = { 'E2': 82.41, 'A2': 110.00, 'D3': 146.83, 'G3': 196.00, 'B3': 246.94, 'E4': 329.63 };
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const openStrings = [4, 9, 2, 7, 11, 4];
const scales = { major: { name: 'Maior', intervals: [0, 2, 4, 5, 7, 9, 11] }, minor: { name: 'Menor', intervals: [0, 2, 3, 5, 7, 8, 10] }, majorPentatonic: { name: 'Pentatônica Maior', intervals: [0, 2, 4, 7, 9] }, minorPentatonic: { name: 'Pentatônica Menor', intervals: [0, 3, 5, 7, 10] }, blues: { name: 'Blues', intervals: [0, 3, 5, 6, 7, 10] } };

const NUM_FRETS = 24;
const NUM_STRINGS = 6;        
const chordShapes = {
    // Maiores
    'A': { positions: [{ fret: 2, string: 4 }, { fret: 2, string: 3 }, { fret: 2, string: 2 }], muted: [6] },
    'B': { positions: [{ fret: 2, string: 5 }, { fret: 4, string: 4 }, { fret: 4, string: 3 }, { fret: 4, string: 2 }], muted: [6, 1] },
    'C': { positions: [{ fret: 1, string: 2 }, { fret: 2, string: 4 }, { fret: 3, string: 5 }], muted: [6] },
    'D': { positions: [{ fret: 2, string: 3 }, { fret: 3, string: 2 }, { fret: 2, string: 1 }], muted: [6, 5] },
    'E': { positions: [{ fret: 1, string: 3 }, { fret: 2, string: 5 }, { fret: 2, string: 4 }], muted: [] },
    'F': { positions: [{ fret: 1, string: 6 }, { fret: 3, string: 5 }, { fret: 3, string: 4 }, { fret: 2, string: 3 }, { fret: 1, string: 2 }, { fret: 1, string: 1 }], muted: [] },
    'G': { positions: [{ fret: 3, string: 6 }, { fret: 2, string: 5 }, { fret: 3, string: 1 }], muted: [] },
    // Menores
    'Am': { positions: [{ fret: 1, string: 2 }, { fret: 2, string: 4 }, { fret: 2, string: 3 }], muted: [6] },
    'Bm': { positions: [{ fret: 2, string: 5 }, { fret: 4, string: 4 }, { fret: 4, string: 3 }, { fret: 3, string: 2 }, { fret: 2, string: 1 }], muted: [6] },
    'Cm': { positions: [{ fret: 3, string: 5 }, { fret: 5, string: 4 }, { fret: 5, string: 3 }, { fret: 4, string: 2 }, { fret: 3, string: 1 }], muted: [6] },
    'Dm': { positions: [{ fret: 1, string: 1 }, { fret: 2, string: 3 }, { fret: 3, string: 2 }], muted: [6, 5] },
    'Em': { positions: [{ fret: 2, string: 5 }, { fret: 2, string: 4 }], muted: [] },
    'Fm': { positions: [{ fret: 1, string: 6 }, { fret: 3, string: 5 }, { fret: 3, string: 4 }, { fret: 1, string: 3 }, { fret: 1, string: 2 }, { fret: 1, string: 1 }], muted: [] },
    'Gm': { positions: [{ fret: 3, string: 6 }, { fret: 5, string: 5 }, { fret: 5, string: 4 }, { fret: 3, string: 3 }, { fret: 3, string: 2 }, { fret: 3, string: 1 }], muted: [] },
    // Com Sétima (Dominante)
    'A7': { positions: [{ fret: 2, string: 4 }, { fret: 2, string: 2 }], muted: [6] },
    'B7': { positions: [{ fret: 2, string: 5 }, { fret: 1, string: 4 }, { fret: 2, string: 3 }, { fret: 2, string: 1 }], muted: [6] },
    'C7': { positions: [{ fret: 1, string: 2 }, { fret: 2, string: 4 }, { fret: 3, string: 5 }, { fret: 3, string: 3 }], muted: [6] },
    'D7': { positions: [{ fret: 2, string: 3 }, { fret: 1, string: 2 }, { fret: 2, string: 1 }], muted: [6, 5] },
    'E7': { positions: [{ fret: 1, string: 3 }, { fret: 2, string: 5 }], muted: [] },
    'F7': { positions: [{ fret: 1, string: 6 }, { fret: 3, string: 5 }, { fret: 1, string: 4 }, { fret: 2, string: 3 }, { fret: 1, string: 2 }, { fret: 1, string: 1 }], muted: [] }, // E7 form barre
    'G7': { positions: [{ fret: 1, string: 1 }, { fret: 2, string: 5 }, { fret: 3, string: 6 }], muted: [] },
    // Sustenidos/Bemóis Maiores
    'A#': { positions: [{ fret: 1, string: 5 }, { fret: 3, string: 4 }, { fret: 3, string: 3 }, { fret: 3, string: 2 }], muted: [6, 1] },
    'Bb': { positions: [{ fret: 1, string: 5 }, { fret: 3, string: 4 }, { fret: 3, string: 3 }, { fret: 3, string: 2 }], muted: [6, 1] },
    'C#': { positions: [{ fret: 4, string: 5 }, { fret: 6, string: 4 }, { fret: 6, string: 3 }, { fret: 6, string: 2 }], muted: [6, 1] },
    'Db': { positions: [{ fret: 4, string: 5 }, { fret: 6, string: 4 }, { fret: 6, string: 3 }, { fret: 6, string: 2 }], muted: [6, 1] },
    'D#': { positions: [{ fret: 6, string: 5 }, { fret: 8, string: 4 }, { fret: 8, string: 3 }, { fret: 8, string: 2 }], muted: [6, 1] },
    'Eb': { positions: [{ fret: 6, string: 5 }, { fret: 8, string: 4 }, { fret: 8, string: 3 }, { fret: 8, string: 2 }], muted: [6, 1] },
    'F#': { positions: [{ fret: 2, string: 6 }, { fret: 4, string: 5 }, { fret: 4, string: 4 }, { fret: 3, string: 3 }, { fret: 2, string: 2 }, { fret: 2, string: 1 }], muted: [] },
    'Gb': { positions: [{ fret: 2, string: 6 }, { fret: 4, string: 5 }, { fret: 4, string: 4 }, { fret: 3, string: 3 }, { fret: 2, string: 2 }, { fret: 2, string: 1 }], muted: [] },
    'G#': { positions: [{ fret: 4, string: 6 }, { fret: 6, string: 5 }, { fret: 6, string: 4 }, { fret: 5, string: 3 }, { fret: 4, string: 2 }, { fret: 4, string: 1 }], muted: [] },
    'Ab': { positions: [{ fret: 4, string: 6 }, { fret: 6, string: 5 }, { fret: 6, string: 4 }, { fret: 5, string: 3 }, { fret: 4, string: 2 }, { fret: 4, string: 1 }], muted: [] },
    // Sustenidos/Bemóis Menores
    'A#m': { positions: [{ fret: 1, string: 5 }, { fret: 3, string: 4 }, { fret: 3, string: 3 }, { fret: 2, string: 2 }], muted: [6, 1] },
    'Bbm': { positions: [{ fret: 1, string: 5 }, { fret: 3, string: 4 }, { fret: 3, string: 3 }, { fret: 2, string: 2 }], muted: [6, 1] },
    'C#m': { positions: [{ fret: 4, string: 5 }, { fret: 6, string: 4 }, { fret: 6, string: 3 }, { fret: 5, string: 2 }], muted: [6, 1] },
    'Dbm': { positions: [{ fret: 4, string: 5 }, { fret: 6, string: 4 }, { fret: 6, string: 3 }, { fret: 5, string: 2 }], muted: [6, 1] },
    'D#m': { positions: [{ fret: 6, string: 5 }, { fret: 8, string: 4 }, { fret: 8, string: 3 }, { fret: 7, string: 2 }], muted: [6, 1] },
    'Ebm': { positions: [{ fret: 6, string: 5 }, { fret: 8, string: 4 }, { fret: 8, string: 3 }, { fret: 7, string: 2 }], muted: [6, 1] },
    'F#m': { positions: [{ fret: 2, string: 6 }, { fret: 4, string: 5 }, { fret: 4, string: 4 }, { fret: 2, string: 3 }, { fret: 2, string: 2 }, { fret: 2, string: 1 }], muted: [] },
    'Gbm': { positions: [{ fret: 2, string: 6 }, { fret: 4, string: 5 }, { fret: 4, string: 4 }, { fret: 2, string: 3 }, { fret: 2, string: 2 }, { fret: 2, string: 1 }], muted: [] },
    'G#m': { positions: [{ fret: 4, string: 6 }, { fret: 6, string: 5 }, { fret: 6, string: 4 }, { fret: 4, string: 3 }, { fret: 4, string: 2 }, { fret: 4, string: 1 }], muted: [] },
    'Abm': { positions: [{ fret: 4, string: 6 }, { fret: 6, string: 5 }, { fret: 6, string: 4 }, { fret: 4, string: 3 }, { fret: 4, string: 2 }, { fret: 4, string: 1 }], muted: [] },
     // Com Sétima Maior (maj7)
    'Cmaj7': { positions: [{ fret: 2, string: 4 }, { fret: 3, string: 5 }], muted: [6] },
    'Dmaj7': { positions: [{ fret: 2, string: 3 }, { fret: 2, string: 2 }, { fret: 2, string: 1 }], muted: [6, 5] },
    'Emaj7': { positions: [{ fret: 1, string: 3 }, { fret: 1, string: 4 }, { fret: 2, string: 5 }], muted: [] },
    'Fmaj7': { positions: [{ fret: 2, string: 4 }, { fret: 2, string: 3 }, { fret: 1, string: 2 }], muted: [6, 5] },
    'Gmaj7': { positions: [{ fret: 3, string: 6 }, { fret: 2, string: 5 }, { fret: 4, string: 4 }, { fret: 4, string: 3 }], muted: [2, 1] },
    'Amaj7': { positions: [{ fret: 1, string: 3 }, { fret: 2, string: 4 }, { fret: 2, string: 2 }], muted: [6] },
    'Bmaj7': { positions: [{ fret: 2, string: 5 }, { fret: 3, string: 3 }, { fret: 4, string: 4 }, { fret: 4, string: 2 }], muted: [6, 1] },
     // Com Sétima Menor (m7)
    'Am7': { positions: [{ fret: 1, string: 2 }, { fret: 2, string: 4 }], muted: [6] },
    'Bm7': { positions: [{ fret: 2, string: 5 }, { fret: 2, string: 3 }, { fret: 3, string: 2 }, { fret: 2, string: 1 }], muted: [6] },
    'Cm7': { positions: [{ fret: 3, string: 5 }, { fret: 3, string: 3 }, { fret: 4, string: 2 }, { fret: 3, string: 1 }], muted: [6] },
    'Dm7': { positions: [{ fret: 1, string: 1 }, { fret: 1, string: 2 }, { fret: 2, string: 3 }], muted: [6, 5] },
    'Em7': { positions: [{ fret: 2, string: 5 }], muted: [] },
    'Fm7': { positions: [{ fret: 1, string: 6 }, { fret: 1, string: 4 }, { fret: 1, string: 3 }, { fret: 1, string: 2 }, { fret: 1, string: 1 }], muted: [5] },
    'Gm7': { positions: [{ fret: 3, string: 6 }, { fret: 3, string: 4 }, { fret: 3, string: 3 }, { fret: 3, string: 2 }, { fret: 3, string: 1 }], muted: [5] },
};

// --- STATE VARIABLES ---
let audioContext;
let analyser, mediaStreamSource, buffer, volumeDataArray;
let isTunerActive = false;
let isMetronomePlaying = false;
let animationFrameId;
let wakeLock = null;
let bpm = 120;
let beatsPerMeasure = 4;
let currentBeatInMeasure = 0;
let metronomeTimerID;
let backingTrack = 'none';
const drumPatterns = {
    rock: { 4: { kick: [0], snare: [2], hihat: [0, 1, 2, 3] } },
    pop:  { 4: { kick: [0, 2], snare: [2], hihat: [0, 1, 2, 3] } }
};
let nextBeatTime = 0.0;
const scheduleAheadTime = 0.1;
const lookahead = 25.0;

// --- CORE FUNCTIONS ---
function setupAudioContext() {
    if (!audioContext) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        } catch (e) {
            alert('A API de Web Audio não é suportada neste navegador.');
        }
    }
}

// --- DRUM SYNTHESIS ---
function createKick(time) { const osc = audioContext.createOscillator(); const gain = audioContext.createGain(); osc.connect(gain); gain.connect(audioContext.destination); osc.frequency.setValueAtTime(150, time); gain.gain.setValueAtTime(0.8, time); osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5); gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5); osc.start(time); osc.stop(time + 0.5); }
function createSnare(time) { const noise = audioContext.createBufferSource(); const bufferSize = audioContext.sampleRate; const buffer = audioContext.createBuffer(1, bufferSize, bufferSize); const output = buffer.getChannelData(0); for (let i = 0; i < bufferSize; i++) { output[i] = Math.random() * 2 - 1; } noise.buffer = buffer; const gain = audioContext.createGain(); gain.gain.setValueAtTime(0.5, time); gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2); noise.connect(gain); gain.connect(audioContext.destination); noise.start(time); noise.stop(time + 0.2); }
function createHiHat(time) { const noise = audioContext.createBufferSource(); const bufferSize = audioContext.sampleRate; const buffer = audioContext.createBuffer(1, bufferSize, bufferSize); const output = buffer.getChannelData(0); for (let i = 0; i < bufferSize; i++) { output[i] = Math.random() * 2 - 1; } noise.buffer = buffer; const biquadFilter = audioContext.createBiquadFilter(); biquadFilter.type = "highpass"; biquadFilter.frequency.setValueAtTime(7000, time); noise.connect(biquadFilter); const gain = audioContext.createGain(); gain.gain.setValueAtTime(0.3, time); gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05); biquadFilter.connect(gain); gain.connect(audioContext.destination); noise.start(time); noise.stop(time + 0.05); }

// --- METRONOME LOGIC ---
function metronomeScheduler() {
    while (nextBeatTime < audioContext.currentTime + scheduleAheadTime) {
        const isAccent = currentBeatInMeasure === 0;
        const pattern = drumPatterns[backingTrack]?.[beatsPerMeasure];

        if (pattern) {
            // Play backing track
            if (pattern.kick.includes(currentBeatInMeasure)) createKick(nextBeatTime);
            if (pattern.snare.includes(currentBeatInMeasure)) createSnare(nextBeatTime);
            if (pattern.hihat.includes(currentBeatInMeasure)) createHiHat(nextBeatTime);
            // Play a softer click on the accent beat for reference
            if (isAccent) playMetronomeSound(nextBeatTime, false, 0.3);
        } else {
            // Play regular metronome
            playMetronomeSound(nextBeatTime, isAccent);
        }

        visualBeat(currentBeatInMeasure === 0);
        const secondsPerBeat = 60.0 / bpm;
        nextBeatTime += secondsPerBeat;
        currentBeatInMeasure = (currentBeatInMeasure + 1) % beatsPerMeasure;
    }
}
function playMetronomeSound(time, isAccent, volume = 1.0) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.setValueAtTime(isAccent ? 880.0 : 440.0, time);
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.start(time);
    osc.stop(time + 0.05);
}
function visualBeat(isAccent) {
    metronomeIndicators.forEach(indicator => {
        indicator.classList.add('beat');
        if (isAccent) indicator.classList.add('accent');
        setTimeout(() => indicator.classList.remove('beat', 'accent'), 100);
    });
}
function startMetronome() {
    if (isTunerActive) stopTuner();
    setupAudioContext();
    if (audioContext.state === 'suspended') audioContext.resume();
    isMetronomePlaying = true;
    currentBeatInMeasure = 0;
    nextBeatTime = audioContext.currentTime;
    metronomeTimerID = setInterval(metronomeScheduler, lookahead);
    updateMetronomeUI();
}
function stopMetronome() {
    isMetronomePlaying = false;
    clearInterval(metronomeTimerID);
    updateMetronomeUI();
}
function toggleMetronome() {
    if (isMetronomePlaying) stopMetronome();
    else startMetronome();
}
function updateMetronomeControls(newBpm, newTimeSignature) {
    if (newBpm !== undefined) {
        bpm = newBpm;
        bpmDisplays.forEach(d => d.textContent = `${bpm} BPM`);
        bpmSliders.forEach(s => s.value = bpm);
    }
    if (newTimeSignature !== undefined) {
        beatsPerMeasure = newTimeSignature;
        timeSignatureSelects.forEach(s => s.value = beatsPerMeasure);
    }
    if (newBpm !== undefined || newTimeSignature !== undefined) {
        // Reset beat count if timing changes
        currentBeatInMeasure = 0;
    }
}
function updateMetronomeUI() {
    if (isMetronomePlaying) {
        startMetronomeBtns.forEach(btn => btn.textContent = 'Parar');
    } else {
        document.querySelector('#metronome-panel-main .start-metronome-btn').textContent = 'Iniciar';
        document.querySelector('#practice-controls-panel .start-metronome-btn').textContent = 'Tocar';
    }
}

// --- TUNER LOGIC ---
async function startTuner() {
    if (isMetronomePlaying) stopMetronome();
    setupAudioContext();
    if (audioContext.state === 'suspended') await audioContext.resume();
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        vuMeterContainer.classList.remove('hidden');
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 4096;
        buffer = new Float32Array(analyser.fftSize);
        volumeDataArray = new Uint8Array(analyser.frequencyBinCount);
        mediaStreamSource.connect(analyser);
        isTunerActive = true;
        startButton.textContent = 'Parar Afinador';
        statusMessage.textContent = 'Afinador ativo. Toque uma corda.';
        updatePitch();
        await requestWakeLock();
    } catch (err) {
        openPermissionModal();
        statusMessage.textContent = 'Acesso ao microfone negado. Siga as instruções.';
    }
}
function stopTuner() {
    if (mediaStreamSource) {
        mediaStreamSource.mediaStream.getTracks().forEach(track => track.stop());
    }
    cancelAnimationFrame(animationFrameId);
    isTunerActive = false;
    startButton.textContent = 'Iniciar Afinador';
    statusMessage.textContent = 'Afinador parado. Clique para iniciar.';
    vuMeterContainer.classList.add('hidden');
    vuMeterBar.style.width = '0%';
    resetUI();
    releaseWakeLock();
}
function toggleTuner() {
    if (isTunerActive) stopTuner();
    else startTuner();
}

/**
 * Implementação do algoritmo YIN para detecção de pitch.
 */
function autoCorrelate(buf, sampleRate) {
    const SIZE = buf.length;
    const YIN_THRESHOLD = 0.20;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
        const val = buf[i];
        rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.015) return { freq: -1, rms: rms };

    const yinBuffer = new Float32Array(SIZE / 2);
    let runningSum = 0;
    yinBuffer[0] = 1;

    for (let tau = 1; tau < SIZE / 2; tau++) {
        let difference = 0;
        for (let i = 0; i < SIZE / 2; i++) {
            const delta = buf[i] - buf[i + tau];
            difference += delta * delta;
        }
        runningSum += difference;
        yinBuffer[tau] = difference / ((runningSum / tau) || 1);
    }

    let tau = -1;
    let min = Infinity;
    for (let t = 12; t < SIZE / 2; t++) {
        if (yinBuffer[t] < YIN_THRESHOLD) {
            if (yinBuffer[t] < min) {
                min = yinBuffer[t];
                tau = t;
            }
        }
    }

    if (tau === -1) {
        return { freq: -1, rms: rms };
    }

    let betterTau;
    const x0 = (tau < 1) ? tau : tau - 1;
    const x2 = (tau + 1 < SIZE / 2) ? tau + 1 : tau;
    if (x0 === tau) {
        betterTau = (yinBuffer[tau] <= yinBuffer[x2]) ? tau : x2;
    } else if (x2 === tau) {
        betterTau = (yinBuffer[tau] <= yinBuffer[x0]) ? tau : x0;
    } else {
        const s0 = yinBuffer[x0];
        const s1 = yinBuffer[tau];
        const s2 = yinBuffer[x2];
        betterTau = tau + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
    }

    return { freq: sampleRate / betterTau, rms: rms };
}

function findClosestNote(freq) { let minDiff = Infinity, closestNote = null; for (const note in tuning) { const diff = Math.abs(tuning[note] - freq); if (diff < minDiff) { minDiff = diff; closestNote = note; } } return closestNote; }
function getCents(frequency, targetFrequency) { return 1200 * Math.log2(frequency / targetFrequency); }
function updatePitch() { analyser.getFloatTimeDomainData(buffer); const { freq } = autoCorrelate(buffer, audioContext.sampleRate); analyser.getByteFrequencyData(volumeDataArray); let sum = volumeDataArray.reduce((a, b) => a + b, 0); let average = sum / volumeDataArray.length; vuMeterBar.style.width = `${Math.min(100, (average / 128) * 150)}%`; if (freq !== -1 && freq > 70 && freq < 450) { statusMessage.textContent = 'Afinador ativo. Toque uma corda.'; const closestNote = findClosestNote(freq); const targetFreq = tuning[closestNote]; const cents = getCents(freq, targetFreq); updateTunerUI(closestNote.replace(/[0-9]/g, ''), freq, cents); } else { if (isTunerActive && average < 1 && statusMessage.textContent.indexOf('negado') === -1) { statusMessage.textContent = 'Afinador ativo. Toque uma corda.'; } resetUIAfterDelay(); } if (isTunerActive) animationFrameId = requestAnimationFrame(updatePitch); }
let resetTimer; function resetUIAfterDelay() { clearTimeout(resetTimer); resetTimer = setTimeout(resetUI, 500); }
function resetUI() { tunerPointer.style.transition = 'transform 1s ease-out, background-color 1s ease-out'; noteNameEl.textContent = '-'; noteNameEl.className = 'text-7xl sm:text-8xl font-bold text-slate-500'; frequencyEl.textContent = '0 Hz'; tunerDisplay.className = 'tuner-circle border-8 border-neutral mx-auto mb-6'; tunerPointer.style.transform = `rotate(0deg)`; tunerPointer.style.backgroundColor = '#f3f4f6'; tunerPointer.style.boxShadow = 'none'; }
function updateTunerUI(note, freq, cents) { clearTimeout(resetTimer); tunerPointer.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease-out'; noteNameEl.textContent = note; frequencyEl.textContent = `${freq.toFixed(1)} Hz`; const rotation = (cents / 50) * 60; const clampedRotation = Math.max(-60, Math.min(60, rotation)); tunerPointer.style.transform = `rotate(${clampedRotation}deg)`; tunerDisplay.classList.remove('border-in-tune', 'border-out-of-tune', 'border-neutral'); noteNameEl.classList.remove('text-amber-400', 'text-red-500', 'text-slate-500'); if (Math.abs(cents) < 5) { tunerDisplay.classList.add('border-in-tune'); tunerPointer.style.backgroundColor = 'var(--accent-amber)'; tunerPointer.style.boxShadow = '0 0 15px var(--accent-amber)'; noteNameEl.className = 'text-7xl sm:text-8xl font-bold text-amber-400'; } else { tunerDisplay.classList.add('border-out-of-tune'); tunerPointer.style.backgroundColor = 'var(--accent-red)'; tunerPointer.style.boxShadow = '0 0 15px var(--accent-red)'; noteNameEl.className = 'text-7xl sm:text-8xl font-bold text-red-500'; } }
let oscillator; function playReferenceTone(freq) { setupAudioContext(); if (audioContext.state === 'suspended') audioContext.resume(); if (oscillator) oscillator.stop(); oscillator = audioContext.createOscillator(); const gainNode = audioContext.createGain(); oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(freq, audioContext.currentTime); gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1); oscillator.connect(gainNode); gainNode.connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + 1); }

// --- FRETBOARD & SCALE LOGIC ---
let dotsContainer1, dotsContainer2;

function drawFretboard() {
    const isMobile = window.innerWidth <= 768;
    fretboardEl1.innerHTML = ''; fretNumbersEl1.innerHTML = '';
    fretboardEl2.innerHTML = ''; fretNumbersEl2.innerHTML = '';

    dotsContainer1 = document.createElement('div'); dotsContainer1.className = 'dots-container';
    fretboardEl1.appendChild(dotsContainer1);

    if (isMobile) {
        dotsContainer2 = document.createElement('div'); dotsContainer2.className = 'dots-container';
        fretboardEl2.appendChild(dotsContainer2);
    }

    const drawPart = (container, numbersEl, startFret, endFret) => {
        for (let i = 0; i < NUM_STRINGS; i++) {
            const string = document.createElement('div');
            string.className = 'string';
            string.style.top = `${(i / (NUM_STRINGS - 1)) * 100}%`;
            container.appendChild(string);
        }

        const numFretsInPart = endFret - startFret + 1;
        for (let i = 1; i <= numFretsInPart; i++) {
            const fretNumber = startFret + i - 1;
            const fret = document.createElement('div');
            fret.className = 'fret';
            fret.style.left = `${(i / numFretsInPart) * 100}%`;
            container.appendChild(fret);

            const num = document.createElement('span');
            num.textContent = fretNumber;
            numbersEl.appendChild(num);

            const markers = { 3: ['50%'], 5: ['50%'], 7: ['50%'], 9: ['50%'], 12: ['25%', '75%'], 15: ['50%'], 17: ['50%'], 19: ['50%'], 21: ['50%'], 24: ['25%', '75%'] };
            if (markers[fretNumber]) {
                markers[fretNumber].forEach(top => {
                    const marker = document.createElement('div');
                    marker.className = 'fret-marker';
                    marker.style.left = `${(i / numFretsInPart) * 100 - (1 / (numFretsInPart * 2)) * 100}%`;
                    marker.style.top = top;
                    container.appendChild(marker);
                });
            }
        }
    };
    
    if (isMobile) {
        drawPart(fretboardEl1, fretNumbersEl1, 1, 12);
        drawPart(fretboardEl2, fretNumbersEl2, 13, 24);
    } else {
        drawPart(fretboardEl1, fretNumbersEl1, 1, 24);
    }
}

function getScaleNotes(rootNoteIndex, scaleIntervals) { return scaleIntervals.map(interval => (rootNoteIndex + interval) % 12); }

function displayScaleOnFretboard(rootNoteIndex, scaleType) {
    const isMobile = window.innerWidth <= 768;
    if (!dotsContainer1 || (isMobile && !dotsContainer2)) return;

    dotsContainer1.innerHTML = '';
    if (isMobile) dotsContainer2.innerHTML = '';
    
    const fretboardWidth = fretboardEl1.offsetWidth; // Assume width is consistent
    const fretboardHeight = fretboardEl1.offsetHeight;
    const stringSpacing = fretboardHeight / (NUM_STRINGS - 1);
    
    const scaleIntervals = scales[scaleType].intervals;
    const scaleNoteIndices = getScaleNotes(rootNoteIndex, scaleIntervals);
    const rootIdx = scaleNoteIndices[0];

    for (let s = 0; s < NUM_STRINGS; s++) {
        for (let f = 1; f <= NUM_FRETS; f++) {
            const currentNoteIndex = (openStrings[s] + f) % 12;
            if (scaleNoteIndices.includes(currentNoteIndex)) {
                const dot = document.createElement('div');
                dot.className = 'finger-dot';
                dot.textContent = notes[currentNoteIndex];
                if (currentNoteIndex === rootIdx) { dot.classList.add('dot-root'); }
                else { if (f <= 4) dot.classList.add('dot-pos1'); else if (f <= 7) dot.classList.add('dot-pos2'); else if (f <= 10) dot.classList.add('dot-pos3'); else if (f <= 12) dot.classList.add('dot-pos4'); }
                dot.style.top = `${s * stringSpacing}px`;

                if (isMobile) {
                    if (f <= 12) {
                        const fretSpacing = fretboardWidth / 12;
                        dot.style.left = `${f * fretSpacing - (fretSpacing / 2)}px`;
                        dotsContainer1.appendChild(dot);
                    } else {
                        const fretInPart2 = f - 12;
                        const fretSpacing = fretboardWidth / 12;
                        dot.style.left = `${fretInPart2 * fretSpacing - (fretSpacing / 2)}px`;
                        dotsContainer2.appendChild(dot);
                    }
                } else {
                     const fretSpacing = fretboardWidth / 24;
                     dot.style.left = `${f * fretSpacing - (fretSpacing / 2)}px`;
                     dotsContainer1.appendChild(dot);
                }
            }
        }
    }
}


// --- SCREEN WAKE LOCK ---
const requestWakeLock = async () => { if ('wakeLock' in navigator && wakeLock === null) { try { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => { wakeLock = null; }); } catch (err) { /* Fail silently */ } } };
const releaseWakeLock = async () => { if (wakeLock !== null) { try { await wakeLock.release(); wakeLock = null; } catch (err) { /* Fail silently */ } } };
const handleVisibilityChange = () => { if (wakeLock === null && document.visibilityState === 'visible' && (isTunerActive || !mainTunerView.classList.contains('hidden'))) { requestWakeLock(); } };

// --- UI HANDLERS & EVENT LISTENERS ---
function generateChordDiagramSVG(chordName) { 
    const chordData = chordShapes[chordName.trim()]; 
    if (!chordData) return null; 
    const SVG_WIDTH = 90, SVG_HEIGHT = 110, NUM_DIAGRAM_FRETS = 4, FRET_HEIGHT = 18, STRING_SPACING = 14; 
    const START_X = (SVG_WIDTH - (NUM_STRINGS - 1) * STRING_SPACING) / 2, START_Y = 25; 
    let svgContent = `<rect x="${START_X - 2}" y="${START_Y}" width="${(NUM_STRINGS - 1) * STRING_SPACING + 4}" height="4" fill="#fff"/>`; 
    for (let i = 1; i <= NUM_DIAGRAM_FRETS; i++) { svgContent += `<line x1="${START_X}" y1="${START_Y + i * FRET_HEIGHT}" x2="${START_X + (NUM_STRINGS - 1) * STRING_SPACING}" y2="${START_Y + i * FRET_HEIGHT}" stroke="#9ca3af" stroke-width="1"/>`; } 
    for (let i = 0; i < NUM_STRINGS; i++) { 
        const x = START_X + i * STRING_SPACING; 
        svgContent += `<line x1="${x}" y1="${START_Y}" x2="${x}" y2="${START_Y + NUM_DIAGRAM_FRETS * FRET_HEIGHT}" stroke="#d1d5db" stroke-width="${1 + i * 0.2}"/>`; 
        const stringNum = NUM_STRINGS - i; 
        if (chordData.muted.includes(stringNum)) { 
            svgContent += `<text x="${x}" y="${START_Y - 5}" font-family="monospace" font-size="12" fill="#f3f4f6" text-anchor="middle">x</text>`; 
        } else if (!chordData.positions.some(p => p.string === stringNum) && !chordData.muted.includes(stringNum)) { 
            svgContent += `<circle cx="${x}" cy="${START_Y - 7}" r="3.5" stroke="#f3f4f6" stroke-width="1.5" fill="none"/>`; 
        } 
    } 
    chordData.positions.forEach(pos => { 
        const x = START_X + (NUM_STRINGS - pos.string) * STRING_SPACING; 
        const y = START_Y + pos.fret * FRET_HEIGHT - (FRET_HEIGHT / 2); 
        svgContent += `<circle cx="${x}" cy="${y}" r="5.5" fill="#f3f4f6"/>`; 
    }); 
    const wrapper = document.createElement('div'); 
    wrapper.className = 'chord-diagram-wrapper'; 
    const nameEl = document.createElement('div'); 
    nameEl.className = 'chord-name'; 
    nameEl.textContent = chordName; 
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); 
    svgEl.setAttribute('width', SVG_WIDTH); 
    svgEl.setAttribute('height', SVG_HEIGHT); 
    svgEl.innerHTML = svgContent; 
    wrapper.appendChild(nameEl); 
    wrapper.appendChild(svgEl); 
    return wrapper; 
}
function displayChordProgression(progression, targetContainer) {
    targetContainer.innerHTML = '';
    const diagramsContainer = document.createElement('div');
    diagramsContainer.id = 'chord-diagrams-container';
    
    const chords = progression.split(' - ').map(c => c.trim()).filter(c => c);

    chords.forEach(chordName => {
        const diagramElement = generateChordDiagramSVG(chordName);
        if (diagramElement) {
            diagramsContainer.appendChild(diagramElement);
        } else {
            console.warn(`Diagrama para o acorde "${chordName}" não encontrado.`);
        }
    });

    if (chords.length > 0) {
        targetContainer.appendChild(diagramsContainer);
    } else {
        targetContainer.innerHTML = `<p class="text-slate-400">Não foi possível gerar acordes para esta escala.</p>`;
    }
}
function getDiatonicChords(rootNoteIndex, scaleType) {
    const scaleIntervals = scales[scaleType]?.intervals;
    if (!scaleIntervals) return [];

    const scaleNotes = scaleIntervals.map(interval => notes[(rootNoteIndex + interval) % 12]);
    let chordQualities = [];

    if (scaleType.includes('major')) {
        chordQualities = ['', 'm', 'm', '', '7', 'm', 'dim']; 
    } else { 
        chordQualities = ['m', 'dim', 'maj7', 'm', 'm', '', '']; 
    }
    
    return scaleNotes.map((note, index) => {
        const quality = chordQualities[index];
        if (quality === 'dim') return null; 
        return note + quality;
    }).filter(chord => chord && chordShapes[chord]);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleGenerateProgression() {
    chordProgressionDisplayArea.classList.add('hidden');
    // Usamos um pequeno timeout para garantir que a UI seja atualizada (o 'hidden' seja aplicado)
    // antes de executar a lógica mais pesada, evitando travamentos visuais.
    setTimeout(() => { 
        const rootNoteIndex = parseInt(scaleKeyVisualizer.value);
        const scaleTypeValue = scaleTypeVisualizer.value;
        
        // Obtém os acordes diatônicos para a escala selecionada (apenas maiores e menores por simplicidade)
        const diatonicChords = getDiatonicChords(rootNoteIndex, scaleTypeValue.includes('minor') ? 'minor' : 'major');
        
        if (diatonicChords.length < 4) {
            chordDiagramsOutput.innerHTML = `<p class="text-slate-400">Não há acordes suficientes nesta tonalidade para gerar uma progressão.</p>`;
            chordProgressionDisplayArea.classList.remove('hidden');
            return;
        }
        
        // Embaralha os acordes e pega os 4 primeiros para criar a progressão
        const shuffledChords = shuffleArray([...diatonicChords]);
        const finalProgression = shuffledChords.slice(0, 4);
        
        displayChordProgression(finalProgression.join(' - '), chordDiagramsOutput);
        chordDiagramsOutput.classList.remove('hidden');
        chordProgressionDisplayArea.classList.remove('hidden');
    }, 50);
}

function drawCurrentScaleInVisualizer() {
    drawFretboard(); // Redesenha a estrutura do braço primeiro
    const key = parseInt(scaleKeyVisualizer.value); 
    const type = scaleTypeVisualizer.value; 
    requestAnimationFrame(() => { 
        displayScaleOnFretboard(key, type); 
        if (!chordProgressionDisplayArea.classList.contains('hidden')) {
            handleGenerateProgression();
        }
    }); 
}
function handleVisualizeScale() {
    mainTunerView.classList.add('hidden'); 
    scaleVisualizerView.classList.remove('hidden'); 
    requestWakeLock(); 
    
    // Define os seletores da Sala de Estudo para um padrão (C Maior) na primeira vez.
    scaleKeyVisualizer.value = '0';
    scaleTypeVisualizer.value = 'major';

    // Atraso para garantir que o layout foi renderizado antes de desenhar
    setTimeout(drawCurrentScaleInVisualizer, 50); 
    chordProgressionDisplayArea.classList.add('hidden'); 
    chordDiagramsOutput.innerHTML = ''; 
}
function openPermissionModal() { permissionModal.classList.remove('hidden'); }
function closePermissionModal() { permissionModal.classList.add('hidden'); }

// --- INITIALIZATION & EVENT LISTENERS ---
// A primeira chamada é movida para handleVisualizeScale para garantir o layout correto
startButton.addEventListener('click', toggleTuner);
stringButtons.forEach(button => { button.addEventListener('click', () => playReferenceTone(parseFloat(button.dataset.freq))); });
generateProgressionBtn.addEventListener('click', handleGenerateProgression);
visualizeScaleBtn.addEventListener('click', handleVisualizeScale);
backToTunerBtn.addEventListener('click', () => { if (isMetronomePlaying) stopMetronome(); scaleVisualizerView.classList.add('hidden'); mainTunerView.classList.remove('hidden'); if (!isTunerActive) releaseWakeLock(); });
scaleKeyVisualizer.addEventListener('change', drawCurrentScaleInVisualizer);
scaleTypeVisualizer.addEventListener('change', drawCurrentScaleInVisualizer);
mirrorFretboardBtn.addEventListener('click', () => { fretboardContainer.classList.toggle('mirrored'); drawCurrentScaleInVisualizer(); });
startMetronomeBtns.forEach(btn => btn.addEventListener('click', toggleMetronome));
bpmSliders.forEach(slider => slider.addEventListener('input', (e) => updateMetronomeControls(parseInt(e.target.value), undefined)));
timeSignatureSelects.forEach(select => select.addEventListener('input', (e) => updateMetronomeControls(undefined, parseInt(e.target.value))));
closeModalBtn.addEventListener('click', closePermissionModal);
backingTrackSelects.forEach(select => select.addEventListener('input', (e) => { backingTrack = e.target.value; backingTrackSelects.forEach(s => s.value = backingTrack); }));
retryMicBtn.addEventListener('click', () => { closePermissionModal(); toggleTuner(); });
document.addEventListener('visibilitychange', handleVisibilityChange);
window.addEventListener('resize', drawCurrentScaleInVisualizer); // Redesenha ao redimensionar