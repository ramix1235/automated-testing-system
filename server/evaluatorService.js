class EvaluatorService {
    evaluate(answer, etalon) {
        // TODO: need evaluate passed test with algorithms

        return answer === etalon ? 100 : 0;
    }
}

module.exports = new EvaluatorService();