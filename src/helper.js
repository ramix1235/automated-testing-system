import crc from 'crc';

function extractWords(str) {
    let words;
    words = str.match(/[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69Fa-zA-Z0-9+-]+('[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69Fa-zA-Z0-9+-]+)?/g) || [];

    words = words.map(str => str.toLowerCase());

    return words;
}

export function shingles(answer, etalon) {
    const shingleLength = 3;

    const etalonWorlds = extractWords(etalon);
    const answerWorlds = extractWords(answer);

    const etalonShingles = makeShingles(etalonWorlds, shingleLength);
    const answerShingles = makeShingles(answerWorlds, shingleLength);

    const etalonHashed = hashingShingles(etalonShingles);
    const answerHashed = hashingShingles(answerShingles);

    const ro = compareShingles(etalonHashed[0], answerHashed[0]);

    console.log(ro * 100);

    return ro * 100;

    function makeShingles(words, shingleLength) {
        const shingles = [];
        let wordsCopy = [...words];

        if (words.length < shingleLength) {
            shingles.push(wordsCopy.join(' '));
        } else {
            while (shingles.length !== (words.length - shingleLength + 1)) {
                shingles.push(wordsCopy.slice(0, shingleLength).join(' '));
                wordsCopy = wordsCopy.slice(1);
            }
        }

        return shingles;
    }

    function hashingShingles(shingles) {
        const hashes = [];

        for (let i = 0, n = 1; i < n; i++) {
            const hashedArr = [];

            for (let j = 0, k = shingles.length; j < k; j++) {
                hashedArr.push(crc.crc32(shingles[j]));
            }

            hashes.push(hashedArr);
        }

        return hashes;
    }

    function compareShingles(arr1, arr2) {
        let count = 0;

        arr1.forEach(hash => {
            if (arr2.includes(hash)) {
                count++;
            }
        });

        return (count / (arr1.length + arr2.length - count)); // коэфф Жаккара
        // return count * 2 / (arr1[0].length + arr2[0].length);
    };
}

export function proximityOfWordsWithWeights(answer, etalon) {
    // p1
    const etalonWorlds = extractWords(etalon);
    const answerWorlds = extractWords(answer);

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

    console.log(ro * 100);

    return ro * 100;
}