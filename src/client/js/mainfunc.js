import {btn, outputElements, txt, toSend} from './vars'

async function getAnalysis() {
    toSend['rqst'] = txt.value;
    try {
        if (txt.value == "") {
		setTimeout( () => alert('Fill in your news article!'),0);
            return;
        }
        let rslt = await fetch('http://localhost:3000/analysis_result', {
            method: "POST",
            body: JSON.stringify(toSend),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        rslt.json().then(
            (respnse) =>
			{
				outputElements[0].textContent
				= JSON.stringify(respnse.result.score_tag);//sentiment
				outputElements[1].textContent
				= JSON.stringify(respnse.result.agreement);// agreement
				outputElements[2].textContent
				= JSON.stringify(respnse.result.confidence);// confidence
			},
            () => outputElement.textContent = 'Error happened during handling data returned from fetch request'
        );
    } catch (err) {
        outputElements[0].textContent = 'Error when trying to fetch, is the server offline?';
        console.log('Error during fetch: ' + err.message);
    }

}

export{getAnalysis, btn, outputElements, txt, toSend};