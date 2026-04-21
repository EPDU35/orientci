// scoring.js — algorithme de scoring heuristique multi-critères

const Scoring = {
    compute(answers) {
        const scores = {};

        FILIERES_IDS.forEach(id => { scores[id] = 0; });

        Object.values(answers).forEach(val => {
            const mapping = SCORE_MAP[val];
            if (!mapping) return;
            Object.entries(mapping).forEach(([filiereId, pts]) => {
                if (scores[filiereId] !== undefined) {
                    scores[filiereId] += pts;
                }
            });
        });

        const results = FILIERES_IDS.map(id => {
            const raw = scores[id];
            const max = MAX_SCORES[id] || 60;
            const pct = Math.min(Math.round((raw / max) * 100), 99);
            return { id, score: pct };
        });

        results.sort((a, b) => b.score - a.score);

        const top5 = results.slice(0, 5);
        Storage.saveResults(top5);
        return top5;
    }
};