function vratiPodatke(content) {
    const redoviPodataka = content.split(/\r?\n/);
    var testovi = [];
    for (let i = 0; i < redoviPodataka.length; i++) {
        var podatak = redoviPodataka[i].split(",");
        var o = podatak[0];
        var r = podatak[1];
        var u = podatak[2];
        var nastavi = 3;
        if (podatak[2].startsWith('{') && !podatak[2].endsWith('}')) {
            for (var k = 3; k < podatak.length; k++) {
                if (podatak[k].endsWith('}')) {
                    u += podatak[k];
                    nastavi = k + 1;
                    break;
                } else if (podatak[k].match(/[0-9]$/)) {
                    u += podatak[k] + ",";
                } else {
                    u += podatak[k];
                }
            }
        }
        var iz = podatak[nastavi];
        if (podatak.length > 4 && nastavi + 1 != podatak.length) {
            for (var j = nastavi + 1; j < podatak.length; j++) {
                if (podatak[j].match(/[0-9]$/)) {
                    iz += podatak[j] + ",";
                } else iz += podatak[j];
            }
        }


        u = u.split('\\').join('');
        u = u.split('""').join('","');



        iz = iz.split('}{').join('},{');
        iz = iz.split('\\').join('');
        iz = iz.split('""').join('","');

        const test = {
            operacija: o,
            ruta: r,
            ulaz: u,
            izlaz: iz
        };
        //console.log(test);
        testovi.push(test);
    }
    return testovi;
}

module.exports = vratiPodatke;