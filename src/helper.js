function extractWords(str) {
    let words;
    words = str.match(/[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69Fa-zA-Z0-9+-]+('[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69Fa-zA-Z0-9+-]+)?/g) || [];

    words = words.map(str => str.toLowerCase());

    return words;
}

export function proximityOfWordsWithWeights(answer, etalon) {
    // p1
    const etalonWorlds = extractWords('Кожен мисливець бажає знати, де сидить фазан.');
    const answerWorlds = extractWords('мисливець, знати бажає, де сидить – фазан кожен!!!');

    // p2
    const Dmax = 3;

    // p3
    let i = 1;
    let j = 1;
    let k = 1;
    let R = 0;
    let ro = 0;

    p4();

    function p4() {
        if (etalonWorlds[i - 1] === answerWorlds[k - 1]) {
            j = k;
            R++;
            p7();
        } else {
            p6();
        }
    }

    function p5() {
        if (i < etalonWorlds.length) {
            i++;
            k = 1;
            p4();
        }
    }

    function p6() {
        if (k < answerWorlds.length) {
            k++;
            p4();
        } else {
            p5();
        }
    }

    function p7() {
        let d = 1;
        p8(d);
    }

    function p8(d) {
        if (j + d < etalonWorlds.length && etalonWorlds[i - 1] === answerWorlds[j + d - 1]) { // or are they synonyms
            j = j + d;
            p10(d, j);
        } else {
            p9(d);
        }
    }

    function p9(d) {
        if (j - d > 0 && etalonWorlds[i - 1] === answerWorlds[j - d - 1]) { // or are they synonyms
            j = j - d;
            p10(d, j);
        } else {
            p11(d);
        }
    }

    function p10(d, j) {
        const r = d < Dmax ? 1 : (1 / (d - Dmax + 1));
        R = R + r;
        p12();
    }

    function p11(d) {
        if (d < answerWorlds.length) {
            d++;
            p8(d);
        } else {
            p12();
        }
    }

    function p12() {
        if (i < etalonWorlds.length) {
            i++;
            p7();
        } else {
            p13();
        }
    }

    function p13() {
        ro = R / etalonWorlds.length;
    }

    console.log(ro);

    return ro * 100;
}