export default function evaluate(recordObj){
    let countCorrectAnswer = 0;
    const record = recordObj;
    record.answerSheet.forEach((r) => {
        r.answerOptions.forEach((a) => {
            if ( a.isSelected === true && a.isCorrect === true) {
                countCorrectAnswer++;
            }
        })
    });
    console.log(countCorrectAnswer);
    record.score = record.answerSheet[0].point * countCorrectAnswer;
    return record;
}
