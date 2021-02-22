window.onload = function () {
    window.wallpaperPropertyListener = {
        applyUserProperties: function (properties) {
            // Accent Color
            if (properties.accentColor1) {
                if (properties.accentColor1.value) {
                    setColor("--schemeColor", properties.accentColor1.value);
                }
            }
            // Primary Text
            if (properties.textColor1) {
                if (properties.textColor1.value) {
                    setColor("--font1", properties.textColor1.value);
                }
            }
            // Secondary Text
            if (properties.textColor2) {
                if (properties.textColor2.value) {
                    setColor("--font2", properties.textColor2.value);
                }
            }
            // Version Control
            if (properties.version) {
                if (properties.version.text != localStorage.getItem("wallpaper_version")) {
                    localStorage.setItem("wallpaper_version", properties.version.text);
                    alerta.actualizacion(
                        "SUPPORTERS ♥ / FEB, 2021",
                        "This month supporters are:",
                        `
                            <dl>
                                <dt>- Tom ♥ (Multi character selector)</dt>
                                <dt>- Christopher ♥</dt>
                                <dt>- 장한윤 ♥</dt>
                                <dt>- Chase ♥</dt>
                                <dt>- Neikea ♥</dt>
                            </dl>
                            <a class="chico">Thank you all for helping me in this little world, you are the best!</a>
                            `
                    );
                    alerta.actualizacion(
                        "UPDATE & PATCH NOTES / FEB 22, 2021",
                        "ASUKA / Neon Genesis Evangelion has been updated",
                        `
                            <dl>
                                <dt>New Content:</dt>
                                    <dd>- Character and background customization, now you can select your own ♥.</dd>
                                    <dd>- Full color customization.</dd>
                                    <dd>- Schedule and Notes memory.</dd>
                                    <dd>- Spotify memory wipe button.</dd>
                                <dt>Patches:</dt>
                                    <dd>- Visualizer and Spotify updated for ultrawide resolutions.</dd>
                                    <dd>- Information display fixed.</dd>
                                    <dd>- Spotify code reworked.</dd>
                                    <dd>- Spotify alerts are more specific now.</dd>
                            </dl>
                            <a class="chico">If you enjoy this wallpaper please leave a like. And remember, if you want to leave a comment,<br>suggestion or report a bug, you can do it on the workshop page. Every single comment matters, always!</a>
                        `
                    );
                }
            }
            // Visualizer Color
            if (properties.visColor) {
                if (properties.visColor.value) {
                    cancion.nombre = "";
                    cancion.artista = "";
                    cancion.caratula = "";
                    setColor(audio_ctx, properties.visColor.value, true);
                    setColor(spotify_ctx, properties.visColor.value, true);
                }
            }
            // Waifu Selector
            if (properties.waifuSelector) {
                cargarWaifu(properties.waifuSelector.value);
            }
            // Waifu Invert
            if (properties.waifuInvert) {
                if (properties.waifuInvert.value){
                    invertCharacter = true;
                    document.getElementById("personaje").style.transform = "scaleX(-1) scale("+characterScale/100+")";
                    document.getElementById("sombra").style.transform = "scaleX(-1) scale("+characterScale/100+")";
                } else {
                    invertCharacter = false;
                    document.getElementById("personaje").style.transform = "scaleX(1) scale("+characterScale/100+")";
                    document.getElementById("sombra").style.transform = "scaleX(1) scale("+characterScale/100+")";
                }
            }
            // Waifu X
            if (properties.waifuX){
                moveCharacter(properties.waifuX.value,false);
            }
            // Waifu Y
            if (properties.waifuY){
                moveCharacter(false,properties.waifuY.value);
            }
            // Shadow X
            if (properties.shadowX){
                moveCharacter(false,false,properties.shadowX.value,false);
            }
            // Shadow Y
            if (properties.shadowY){
                moveCharacter(false,false,false,properties.shadowY.value);
            }
            // Waifu Scale
            if(properties.waifuScale){
                characterScale = properties.waifuScale.value;
                invertCharacter ? document.getElementById("personaje").style.transform = "scaleX(-1) scale("+characterScale/100+")" : document.getElementById("personaje").style.transform = "scale("+characterScale/100+")"; 
            }
            // Shadow Scale
            if (properties.shadowScale){
                shadowScale = properties.shadowScale.value;
                invertCharacter ? document.getElementById("sombra").style.transform = "scaleX(-1) scale("+shadowScale/100+")" : document.getElementById("sombra").style.transform = "scale("+shadowScale/100+")";
            }
            // Waifu Shadow
            if (properties.waifuShadowColor) {
                if (properties.waifuShadowColor.value) {
                    firstLoad ? setColor("", properties.waifuShadowColor.value, true, true) : shadowColor = properties.waifuShadowColor.value;
                }
            }
            if (properties.waifuShadowOpacity){
                opacityShadow = properties.waifuShadowOpacity.value / 100;
                document.getElementById("sombra").style.opacity = opacityShadow;
            }
            // Background Color
            if (properties.backgroundColor) {
                if (properties.backgroundColor.value) {
                    setColor("--bgColor", properties.backgroundColor.value);
                }
            }
            // Tilted Bar
            if (properties.tiltedBarColor) {
                if (properties.tiltedBarColor.value) {
                    inclinada_ctx.clearRect(-188, 401, 780, 2300);
                    setColor(inclinada_ctx, properties.tiltedBarColor.value, true);
                    inclinada_ctx.beginPath();
                    inclinada_ctx.fillRect(-189, 400, 780, 2300);
                }
            }
            // Display Day
            if (properties.displayDay) {
                if (properties.displayDay.value) {
                    document.getElementById("monthYear").style.display = "inline-block";
                } else {
                    document.getElementById("monthYear").style.display = "none";
                }
            }
            // Display Calendar
            if (properties.displayCalendar) {
                if (properties.displayCalendar.value) {
                    document.getElementById("contenedorCalendario").style.display = "block";
                    dibujarCalendario();
                } else {
                    document.getElementById("contenedorCalendario").style.display = "none";
                }
            }
            // Display Clock
            if (properties.displayClock) {
                if (properties.displayClock.value) {
                    document.getElementById("hora").style.display = "inline-block";
                    dibujarHora();
                } else {
                    document.getElementById("hora").style.display = "none";
                }
            }
            // Display Weather
            if (properties.displayWeather) {
                if (properties.displayWeather.value) {
                    document.getElementById("climaTitulo").style.display = "block";
                    if (properties.weatherAPIKey.value != "") {
                        APIkey = properties.weatherAPIKey.value;
                        if (properties.weatherLocation.value != "") {
                            ciudad = properties.weatherLocation.value;
                            // Type of weather temperature (Imperial/Metric)
                            if (properties.weatherTemperature) {
                                convencion = properties.weatherTemperature.value;
                                ciclos = 4;
                                climaActivo = true;
                                LeerClima();
                            }
                        } else {
                            climaActivo = false;
                            alerta.clima("City name required.");
                            document.getElementById("climaTitulo").innerHTML = "WEATHER: <span><i class='wi wi-day-sunny'></i>City name required.</span>";
                            document.getElementById("clima").innerHTML = '<tr><td><i class="wi wi-day-sunny"></i> City name </td><td>required.</td></tr><tr><td><i class="wi wi-day-sunny"></i> City name </td><td>required.</td></tr><tr><td><i class="wi wi-day-sunny"></i> City name </td><td>required.</td></tr>';
                        }
                    } else {
                        climaActivo = false;
                        document.getElementById("climaTitulo").innerHTML = "WEATHER: <span><i class='wi wi-day-sunny'></i>AccuWeather API Key required.</span>";
                        document.getElementById("clima").innerHTML = '<tr><td><i class="wi wi-day-sunny"></i> AccuWeather API Key </td><td>required.</td></tr><tr><td><i class="wi wi-day-sunny"></i> AccuWeather API Key </td><td>required.</td></tr><tr><td><i class="wi wi-day-sunny"></i> AccuWeather API Key </td><td>required.</td></tr>';
                    }
                } else {
                    climaActivo = false;
                    document.getElementById("climaTitulo").style.display = "none";
                }
            }
            // Display Weather Forecast
            if (properties.displayWeatherForecast) {
                if (properties.displayWeatherForecast.value) {
                    document.getElementById("clima").style.display = "block";
                    forecast = true;
                    climaProximo();
                } else {
                    document.getElementById("clima").style.display = "none";
                    forecast = false;
                }
            }
            // Display Schedule
            if (properties.displaySchedule) {
                if (properties.displaySchedule.value) {
                    document.getElementById("cronogramaTitulo").style.display = "table";
                    document.getElementById("cronograma").style.display = "table";
                    document.getElementById("contenedorCronogramaNotas").display = "block";
                    cargarCronograma();
                } else {
                    document.getElementById("cronogramaTitulo").style.display = "none";
                    document.getElementById("cronograma").style.display = "none";
                    if (document.getElementById("notas").display != "block"){
                        document.getElementById("contenedorCronogramaNotas").display = "none";
                    }
                }
            }
            // Display Notes
            if (properties.displayNotes) {
                if (properties.displayNotes.value) {
                    document.getElementById("contenedorCronogramaNotas").display = "none";
                    document.getElementById("notas").style.display = "block";
                    cargarNotas();
                } else {
                    document.getElementById("notas").style.display = "none";
                    if (document.getElementById("cronograma").display != "block"){
                        document.getElementById("contenedorCronogramaNotas").display = "none";
                    }
                }
            }
            // Copy Schedule
            if (properties.copySchedule) {
                if (properties.copySchedule.value) {
                    copySchedule();
                }
            }
            // Clean Schedule Memory
            if (properties.cleanSchedule) {
                if (properties.cleanSchedule.value) {
                    localStorage.removeItem("scheduleMD5");
                    localStorage.removeItem("scheduleBase64");
                    localStorage.removeItem("notesMD5");
                    localStorage.removeItem("notesBase64");
                    alerta.scheduleClean();
                }
            }
            // Display Spotify
            if (properties.spotifyAPI) {
                if (properties.spotifyAPI.value) {
                    spotifyData.inicializar = true;
                    if (properties.spotifyClientID) {
                        if (properties.spotifyClientID.value != "") {
                            spotifyData.clienteID = properties.spotifyClientID.value;
                        } else {
                            alerta.spotify("Spotify Client ID is missing.");
                            spotifyAPI.stop();
                        }
                    }
                    if (properties.spotifyClientSecret) {
                        if (properties.spotifyClientSecret.value != "") {
                            spotifyData.clienteSecreto = properties.spotifyClientSecret.value;
                        } else {
                            alerta.spotify("Spotify Client Secret is missing.");
                            spotifyAPI.stop();
                        }
                    }
                    if (properties.spotifyAuthCode) {
                        if (properties.spotifyAuthCode.value != "") {
                            spotifyData.auth = properties.spotifyAuthCode.value;
                        } else {
                            alerta.spotify("Spotify Authorization Code is missing.");
                            spotifyAPI.stop();
                        }
                    }
                } else {
                    spotifyAPI.stop();
                }
            }
            // spotify Reset
            if (properties.spotifyResetMemory) {
                if (properties.spotifyResetMemory.value) {
                    alerta.spotify("Spotify Data Removed!");
                    spotifyAPI.clean();
                }
            }
            // Audio Processing Support
            if (!properties.supportsaudioprocessing) {
                audio_ctx.clearRect(955, 690, 205, 650); // Clean residual bars
            }
            // Normalize Audio
            if (properties.normalizeAudio) {
                normalizar = properties.normalizeAudio.value;
            }
            // Max Audio Bars Height
            if (properties.maxHeight) {
                alturaMax = properties.maxHeight.value;
            }
            // Audio Listener
            if (window.wallpaperRegisterAudioListener) {
                window.wallpaperRegisterAudioListener(function (audioArray) {
                    filtrarAudio(audioArray);
                });
            }
        }
    }

    const root = document.querySelector(':root');
    function setColor(variable, data, isCanvas, paintWaifu) {
        let rgb = data.split(" ").map(function (color) {
            return color * 255;
        }); // Separate RGB channels and multiply them by 255.
        if (isCanvas) {
            paintWaifu ? displayWaifuShadow(rgb[0],rgb[1],rgb[2]) : variable.fillStyle = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
        } else {
            root.style.setProperty(variable, "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]));
        }
        function componentToHex(c) {
            let hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
    }

    /*
        --------------------
        CHARACTER VISUALIZER
        --------------------
    */
    var shadowColor = "";
    var firstLoad = false;
    var invertCharacter = false;
    var opacityShadow = 1;
    var characterScale = 100;
    var characterX = 0;
    var characterY = 0;
    var shadowScale = 0;
    var shadowX = 0;
    var shadowY = 0;

    var shadowProcessing;
    function cargarWaifu(ubicacion){
        // Creating a new canvas for the character and it's shadow
        let canvasCharacter = document.createElement("canvas");
        let canvasShadow = document.createElement("canvas");
        canvasCharacter.id = "personaje";
        canvasShadow.id = "sombra";
        if (ubicacion === "undefined" || ubicacion === undefined || ubicacion === ""){
            ubicacion = "files/AsukaForegroundAsuka.png";
        } else {
            console.log(ubicacion);
            ubicacion = "file:///"+ubicacion;
        }
        let img = document.createElement("img");
        img.onload = function(){
            // Why removing? Because the next time someone loads an image, it will break... Better remove, just in case!
            document.getElementById("personaje").remove();
            document.getElementById("sombra").remove();
            document.getElementById("asistenteImagen").src = ubicacion;
            canvasCharacter.height = img.height;
            canvasCharacter.width = img.width;
            canvasShadow.height = img.height;
            canvasShadow.width = img.width;

            (document.getElementsByTagName("body")[0]).appendChild(canvasCharacter);
            (document.getElementsByTagName("body")[0]).appendChild(canvasShadow);
            document.getElementById("sombra").style.opacity = opacityShadow;

            let character = document.getElementById("personaje");
            let ctxcharacter = character.getContext("2d");

            ctxcharacter.drawImage(img, 0, 0);
            shadowProcessing = ctxcharacter.getImageData(0, 0, ctxcharacter.canvas.width, ctxcharacter.canvas.height);
            setColor("",shadowColor, true, true);

            character.style.transform = invertChar()+" scale("+characterScale/100+")";
            document.getElementById("sombra").style.transform = invertChar()+" scale("+shadowScale/100+")";
            moveCharacter(characterX, characterY, shadowX, shadowY);
            function invertChar(){
                if (invertCharacter){
                    return "scaleX(-1)"
                } else {
                    return "scaleX(1)"
                }
            }
        }
        img.src = ubicacion;
    }

    function displayWaifuShadow(r,g,b) {
        let shadow = document.getElementById("sombra");
        let ctxshadow = shadow.getContext("2d");

        let color = shadowProcessing.data.length;
        while (color-=4){ // I know this is intense, but is the only way
            shadowProcessing.data[color]= r;
            shadowProcessing.data[color+1]= g;
            shadowProcessing.data[color+2]= b;
        }
        ctxshadow.putImageData(shadowProcessing,0,0);
        firstLoad = true;
    }

    function moveCharacter(cx, cy, sx, sy){
        if (cx !== false){
            characterX = cx;
            document.getElementById("personaje").style.right = -cx*1.5+"px";
        }
        if (cy !== false){
            characterY = cy;
            document.getElementById("personaje").style.top = cy*1.5+"px";
        }
        if (sx !== false){
            shadowX = sx;
            document.getElementById("sombra").style.right = -sx*1.5+"px";
        }
        if (sy !== false){
            shadowY = sy;
            document.getElementById("sombra").style.top = sy*1.5+"px";
        }
    }


    /*
    	--------
    	CALENDAR
    	--------
    */
    var dateOrg = new Date();
    const meses = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const diasSemana = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    var hora = [dateOrg.getHours(), dateOrg.getMinutes(), dateOrg.getDate(), dateOrg.getFullYear()];

    function dibujarCalendario() {
        document.getElementById("calendario").innerHTML = "<tr><td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td></tr>";

        let mes = dateOrg.getMonth();
        let dias = new Date(dateOrg.getFullYear(), mes + 1, 0).getDate();
        let elem = document.createElement("tr");
        let aux = new Date(dateOrg.getFullYear(), mes, 1).getDay();

        for (let i = 0; i < aux; i++) {
            cargar("");
        }
        for (let i = 1; i <= dias; i++) {
            aux = new Date(dateOrg.getFullYear(), mes, i).getDay();
            if (diasSemana[aux] == diasSemana[0]) {
                document.getElementById("calendario").appendChild(elem);
                elem = document.createElement("tr");
                cargar(i);
            } else {
                cargar(i);
            }
        }

        function cargar(data) {
            elem.appendChild(document.createElement("td")).appendChild(document.createTextNode(data));
        }
        document.getElementById("calendario").appendChild(elem);
        document.getElementById("monthYear").getElementsByTagName("span")[0].innerHTML = diasSemana[new Date(dateOrg.getFullYear(), mes, hora[2]).getDay()] + " /";
        document.getElementById("monthYear").getElementsByTagName("span")[1].innerHTML = meses[mes] + " " + hora[3];

        marcarCalendario();
        document.getElementById("informacionLateral").style.opacity = 1;
        
    }

    function marcarCalendario() {
        let anteriores = true; // Past days signal
        let dias = document.getElementById("calendario").getElementsByTagName("td");
        for (let i = 7; i < dias.length; i++) {
            if (anteriores) {
                dias[i].classList.add("pasado");
            } // Past days marker
            if (dias[i].innerHTML == hora[2]) {
                dias[i].classList.add("dia"); // Today's marker
                anteriores = false;
            }
        }
    }


    /*
        -----
        CLOCK
        -----
    */
    function dibujarHora() {
        let tiempo = document.getElementById("hora").getElementsByTagName("span");
        tiempo[0].innerHTML = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    /*
        hora[0] -> Hour
        hora[1] -> Minutes
        hora[2] -> Date
        hora[3] -> Year
    */
    var RefrescoReloj = setInterval(TimerReloj, 1000);

    function TimerReloj() {
        let fecha = new Date();
        if (hora[1] != fecha.getMinutes()) {
            hora[1] = fecha.getMinutes();
            dibujarHora();
            if (hora[2] != fecha.getDate()) {
                hora[2] = fecha.getDate();
                dibujarCalendario();
                ciclos = 5; // Cicles change, so weather refreshes as soon as date changes
                climaActual();
            }
        }
        if (spotifyData.inicializar) spotifyAPI.request();
    }
    
    let inclinada_canvas = document.getElementById("inclinada");
    let inclinada_ctx = inclinada_canvas.getContext("2d");
    inclinada_ctx.translate(0, 1900);
    inclinada_ctx.rotate(Math.PI / 180 * (-118.3));

    
    /*
            -----------
            WEATHER API
            -----------
    */
    var climaActivo = false;
    var APIkey = "";
    var ciudad = "";
    var codigoCiudad = "";
    var convencion = "Metric";
    var forecast = true;
    var ciclos = 5; // Waiting cicles until the weather API is called again (5 hours)
    var iconos = {
        1: "day-sunny",
        2: "day-sunny-overcast",
        3: "day-sunny-overcast",
        4: "day-sunny-overcast",
        5: "day-sunny-overcast",
        6: "day-sunny-overcast",
        7: "day-cloudy",
        8: "cloudy",
        11: "fog",
        12: "showers",
        13: "day-showers",
        14: "day-showers",
        15: "thunderstorm",
        16: "day-storm-showers",
        17: "day-storm-showers",
        18: "rain",
        19: "snow-wind",
        20: "day-snow",
        21: "day-snow",
        22: "snow",
        23: "day-snow",
        24: "snowflake-cold",
        25: "sleet",
        26: "rain-mix",
        29: "rain-mix",
        30: "hot",
        31: "snowflake-cold",
        32: "strong-wind",
        33: "night-clear",
        34: "night-alt-cloudy",
        35: "night-alt-cloudy",
        36: "night-alt-cloudy",
        37: "night-alt-cloudy",
        38: "night-alt-cloudy",
        39: "night-showers",
        40: "night-showers",
        41: "night-alt-storm-showers",
        42: "night-alt-storm-showers",
        43: "night-alt-snow-wind",
        44: "night-alt-snow-wind"
    }

    function LeerClima() {
        if (climaActivo) {
            $(function () {
                if (codigoCiudad == "") {
                    $.ajax({
                        type: "GET",
                        url: "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + APIkey + "&q=" + ciudad + "&language=en-US&offset=1",
                        dataType: "json",
                        success: function (resultado, status, xhr) {
                            codigoCiudad = resultado[0]["Key"];
                            climaActual();
                        },
                        error: function (error, status, xhr) {
                            alerta.clima("Can't check your City.");
                        }
                    });
                } else {
                    climaActual();
                }
            });
        }
    }

    function climaActual() {
        $(function () {
            if (climaActivo){
                $.ajax({
                    type: "GET",
                    url: "http://dataservice.accuweather.com/currentconditions/v1/" + codigoCiudad + "?apikey=" + APIkey + "&language=en-US",
                    dataType: "json",
                    success: function (resultado, status, xhr) {
                        document.getElementById("climaTitulo").innerHTML = "WEATHER: ";
                        span = document.createElement("span");
                        iconoClima = document.createElement("i");
                        iconoClima.classList.add("wi");
                        iconoClima.classList.add("wi-" + iconos[resultado[0]["WeatherIcon"]]);
                        span.appendChild(iconoClima);
                        temperatura = document.createTextNode(resultado[0]["Temperature"][convencion]["Value"] + "°" + resultado[0]["Temperature"][convencion]["Unit"]);
                        span.appendChild(temperatura);
                        document.getElementById("climaTitulo").appendChild(span);
                        climaProximo();
                    },
                    error: function (error, status, xhr) {
                        alerta.clima("Can't get current conditions.");
                    }
                });
            }
        });
    }

    function climaProximo() {
        let limite_dias = 3;
        if (ciclos == 5 && forecast == true && climaActivo) {
            ciclos = 0;
            var url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + codigoCiudad + "?apikey=" + APIkey + "&language=en-US";
            if (convencion == "Metric") {
                url += "&metric=true";
            }
            $(function () {
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    success: function (resultado, status, xhr) {
                        document.getElementById("clima").innerHTML = "";
                        for (let i = 0; i < limite_dias; i++) {
                            tr = document.createElement("tr");
                            td = document.createElement("td");
                            iconoClima = document.createElement("i");
                            iconoClima.classList.add("wi");
                            iconoClima.classList.add("wi-" + iconos[resultado["DailyForecasts"][i]["Day"]["Icon"]]);
                            td.appendChild(iconoClima);
                            semana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                            temp = " " + semana[new Date(resultado["DailyForecasts"][i]["Date"]).getDay()];
                            switch (i) {
                                case 0:
                                    if (new Date(resultado["DailyForecasts"][i]["Date"]).getDay() !== new Date().getDay()) {
                                        limite_dias++;
                                        i++;
                                    }
                                    td.appendChild(document.createTextNode(" Today"));
                                    break;
                                case 1:
                                    td.appendChild(document.createTextNode(" Tomorrow"));
                                    break;
                                case 2:
                                    td.appendChild(document.createTextNode(temp));
                                    break;
                                case 3:
                                    td.appendChild(document.createTextNode(temp));
                                    break;
                            }
                            tr.appendChild(td);
                            td = document.createElement("td");
                            temp = Math.round(resultado["DailyForecasts"][i]["Temperature"]["Minimum"]["Value"]) + " - " + Math.round(resultado["DailyForecasts"][i]["Temperature"]["Maximum"]["Value"]) + "°" + resultado["DailyForecasts"][i]["Temperature"]["Maximum"]["Unit"];
                            td.appendChild(document.createTextNode(temp));
                            tr.appendChild(td);
                            document.getElementById("clima").appendChild(tr);
                        }
                    },
                    error: function (error, status, xhr) {
                        alerta.clima("Can't get forecast.");
                    }
                });
            });
            limite_dias = 3;
        } else {
            ciclos++;
        }
    }
    var RefrescoClima = setInterval(TimerClima, 3600000);

    function TimerClima() {
        LeerClima();
    }

    /*
        ------------------
        SCHEDULE AND NOTES
        ------------------

        If you wonder, why am I going to use MD5 and the crypto library...
        Well, it's to easily store a hash of all the data inside each day, so I don't have
        to compare the entire chunk of information.
    */

    // Schedule
    const originalScheduleMD5 = "4f336a4c41ab125d25f4ce6f4d3bd892";
    function cargarCronograma() {
        let semana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let activity = "";
        let scheduleComplete = JSON.stringify(scheduleNotes["Schedule"]);
        let scheduleBase64 = btoa(scheduleComplete);
        let scheduleMD5 = CryptoJS.MD5(scheduleBase64);

        if (localStorage.getItem("scheduleMD5") === null) { // First time
            localStorage.setItem("scheduleMD5", scheduleMD5);
            localStorage.setItem("scheduleBase64", scheduleBase64);
        } else if (localStorage.getItem("scheduleMD5") != scheduleMD5 && scheduleMD5 != originalScheduleMD5) { // Not the first time
            localStorage.setItem("scheduleMD5", scheduleMD5);
            localStorage.setItem("scheduleBase64", scheduleBase64);
        }

        document.getElementById("cronograma").innerHTML = "";

        let schedulePlain = atob(localStorage.getItem("scheduleBase64"));
        schedulePlain = JSON.parse(schedulePlain);
        schedulePlain[semana[new Date(dateOrg.getFullYear(), new Date().getMonth(), hora[2]).getDay()]].map(function (daySchedule) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.appendChild(document.createTextNode(daySchedule.hour));
            tr.appendChild(td);
            td = document.createElement("td");
            activity = "/ " + daySchedule.activity;
            tr.appendChild(document.createTextNode(activity));
            document.getElementById("cronograma").appendChild(tr);
        });
    }
    // Notes
    function cargarNotas() {
        let notesComplete = JSON.stringify(scheduleNotes["Notes"]);
        let notesBase64 = btoa(notesComplete);
        let notesMD5 = CryptoJS.MD5(notesBase64);

        if (localStorage.getItem("notesMD5") === null) { // First time
            localStorage.setItem("notesMD5", notesMD5);
            localStorage.setItem("notesBase64", notesBase64);
        } else if (localStorage.getItem("notesMD5") != notesMD5 && notesMD5 != originalScheduleMD5) { // Not the first time
            localStorage.setItem("notesMD5", notesMD5);
            localStorage.setItem("notesBase64", notesBase64);
        }

        let notesPlain = atob(localStorage.getItem("notesBase64"));
        notesPlain = JSON.parse(notesPlain);

        document.getElementById("notas").innerHTML = "";
        notesPlain.map(function (note) {
            document.getElementById("notas").innerHTML += "<a>" + note + "</a><br>";
        });
    }

    /*
        // Copy Schedule

        THis function is just a pain in the a**. Since I have to parse by myself everything, huh...
        You might be wondering: ¿Why?.
        To be honest, I could just leave javascript to do the job and that's it. But, since I am not the only
        one using this, I have to make it look beautiful and easy to read for everyone.
        Ergo, I have to parse it by myself... F U N. Well, not by myself, your CPU will suffer it, lol
    */
    function copySchedule() {
        let schedulePlain = atob(localStorage.getItem("scheduleBase64"));
        let notesPlain = atob(localStorage.getItem("notesBase64"));

        schedulePlain = '"Schedule": ' + js_beautify(schedulePlain);
        notesPlain = ',\n"Notes": ' + notesPlain;
        // God please forgive me for my sins, but I don't know how to handle Regex...
        schedulePlain = schedulePlain
            .replace(/\n        "hour"/g, "hour")
            .replace(/\n        "activity"/g, " activity")
            .replace(/\[{hour:/g, '[\n\t\t{hour:')
            .replace(/\n    }, {/g, '},\n\t\t{')
            .replace(/\n    }/g, '}\n\t');
        notesPlain = notesPlain
            .replace(/: \["/, ': [\n\t"')
            .replace(/","/g, '",\n\t"')
            .replace(/"]/, '"\n]');
        document.getElementById("datosCronograma").value = "var scheduleNotes = {\n" + schedulePlain + notesPlain + "\n}";
        var copyText = document.getElementById("datosCronograma");
        copyText.select();
        document.execCommand("copy");
        alerta.schedule();
    }



    /*
    	-----
    	SOUND
    	-----
    */
    var normalizar = true;
    var alturaMax = 0;
    var canales = 64;
    (muestraAudio = []).length = 64;
    muestraAudio.fill(0);
    (suave = []).length = 64;
    suave.fill(0);
    (pistaSuave = []).length = 64;
    pistaSuave.fill(0);
    (pistaSuaveA = []).length = 64;
    pistaSuaveA.fill(0);
    (suaveA = []).length = 64;
    suaveA.fill(0);
    (suaveB = []).length = 64;
    suaveB.fill(0);
    (suaveC = []).length = 64;
    suaveC.fill(0);
    var ruidoRosa = [1.0548608488838, 0.76054078751554, 0.61124787706261, 0.52188737442096, 0.47582581340335, 0.442985940855, 0.39506604448116, 0.38179901474466, 0.3791498265819, 0.35862620105656, 0.34117808276167,
        0.31407858754586, 0.32956896818321, 0.32649587026332, 0.32553041354753, 0.33023063745582, 0.33723850113961, 0.32845876137105, 0.32345077632073, 0.33371703524763, 0.33559351013352, 0.32755038614695, 0.33723270172874,
        0.33152196761531, 0.34253960054833, 0.33996676648346, 0.35007384375669, 0.34140414964718, 0.35276302794926, 0.45428847576802, 0.57092841582994, 0.56249676873287, 0.64297260455787, 0.64261475342015, 0.72339198663831,
        0.73733259583513, 0.83130048006773, 0.86110594108701, 0.93924222866694, 0.97183918188016, 1.0510377466679, 1.1248085597157, 1.1805661781629, 1.2060520313183, 1.2870901748538, 1.3467060487469, 1.419748566548,
        1.4930113442739, 1.5233661865195, 1.6291546697418, 1.6687760437528, 1.7517802578211, 1.7828743148843, 1.8640559593836, 1.9024009352922, 1.9445452898741, 2.0042892436186, 2.0429756359259, 2.0702872782946,
        2.0901099761327, 2.0997672257821, 2.1029779444138, 2.0654643664757, 2.0357843961318
    ];

    function filtrarAudio(audioArray) {
        for (let i = 0; i < 64; i++) {
            pistaSuave[i] = audioArray[i] / ruidoRosa[i];
            pistaSuave[i] > 1 ? pistaSuave[i] = 1 : false;
            pistaSuave[i + 64] = pistaSuave[i];
            if (normalizar) {
                i == 0 ? suaveA[i] = 0 : suaveA[i] = pistaSuave[i - 1];
                i == 63 ? suaveC[i] = 0 : suaveC[i] = pistaSuave[i + 1];
                suaveB[i] = pistaSuave[i];
                suave[i] = (suaveA[i] + 2 * suaveB[i] + suaveC[i]) / 3;
                muestraAudio[i] = suave[i] * (alturaMax);
            } else {
                suave[i] = pistaSuave[i];
                muestraAudio[i] = suave[i] * (alturaMax);
            }
            muestraAudio[i] > 199 ? muestraAudio[i] = 199 : false;
        }
        window.requestAnimationFrame(render);
    }

    var audio_canvas = document.getElementById("audio_canvas");
    var audio_ctx = audio_canvas.getContext("2d");
    audio_ctx.translate(630, 1980);
    audio_ctx.rotate(Math.PI / 180 * (-118.3));

    function render() {
        audio_ctx.clearRect(955, 690, 205, 700); // Cleans the screen every time rendering animation is triggered
        audio_ctx.beginPath();
        for (i = 0; i < 64; i++) {
            audio_ctx.fillRect(960, 700 + 10 * i, muestraAudio[i], 4);
        }
    }

    /*
                -----------
                SPOTIFY API
                -----------
            */
    /*
     *  Spotify API connection 1.0 (Alpha)
     *  Updated January 5, 2021
     *  Spotify API connection for Wallpaper Engine web.
     *  Author - N0XT - https://steamcommunity.com/id/N0XT666
     *   ------------------------------------------------------------------------------
     *  Maintained at: https://steamcommunity.com/sharedfiles/filedetails/?id=2298673278 (Until Beta)
     *   ------------------------------------------------------------------------------
     *  Documentation licensed under CC BY 3.0
     *  http://creativecommons.org/licenses/by/3.0/
     *  -------------------------------------------------------------------------------
     * 
     * If you have any doubts about this code, improvements or you just want to talk, hit my DMs.
     */
    // All of this should be initialized on properties, but the variables should remain here!
    var spotifyData = {
        inicializar: false,
        activo: true,
        clienteID: "",
        clienteSecreto: "",
        auth: ""
    };
    var cancion = { // song
        artista: "", // artist name
        nombre: "", // name
        album: "", // album name
        caratula: "" // Base64 cover data
        /*tiempo: { // time
            progreso: 0, // progress in seconds (Used for song progress)
            duracion: 0, // song length in seconds (Used for song progress)
            segundos: 0, // seconds
            minutos: 0, // minutes
            procesado: "" // display data (minutes:seconds)
        }*/
    };

    // Canvas initialization
    var spotifyCanvas = document.getElementById("spotify_canvas");
    var spotify_ctx = spotifyCanvas.getContext("2d");
    spotify_ctx.shadowColor = "#262625";
    spotify_ctx.translate(460, 840);
    spotify_ctx.rotate(Math.PI / 180 * (-28.4));

    const spotifyAPI = {
        initialize: async () => {
            await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(spotifyData.clienteID + ":" + spotifyData.clienteSecreto) // btoa() encrypts to base64, just in case you are wondering what does it do! Or you forget... Like I usually do
                },
                 body: "grant_type=authorization_code&code=" + spotifyData.auth + "&redirect_uri=http%3A%2F%2Flocalhost",
            }).then(respuesta => respuesta.json()).then((datos) => {
                if (datos.error !== undefined) {
                    if (datos.error == "invalid_client"){
                        alerta.spotify("Your client ID or Secret is invalid.");
                    }
                    if (datos.error = "invalid_grant"){
                        alerta.spotify("Your Authorization Code is invalid, request a new one.")
                    }
                    spotifyAPI.stop();
                } else {
                    if (typeof (Storage) !== "undefined") {
                        localStorage.setItem("access_token", datos.access_token);
                        localStorage.setItem("token_type", datos.token_type);
                        localStorage.setItem("refresh_token", datos.refresh_token);
                        localStorage.setItem("scope", datos.scope);
                    } else {
                        alerta.spotify("No access to web storage, spotify API won't work.");
                    }
                }
            }).catch(error => {});
        },
        refresh: async () => {
            await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(spotifyData.clienteID + ":" + spotifyData.clienteSecreto)
                },
                body: "grant_type=refresh_token&refresh_token=" + localStorage.getItem("refresh_token"),
            }).then(respuesta => respuesta.json()).then((datos) => {
                if (datos.error !== undefined) {
                    spotifyAPI.initialize();
                    spotifyAPI.stop();
                } else {
                    if (typeof (Storage) !== "undefined") {
                        localStorage.setItem("access_token", datos.access_token);
                        localStorage.setItem("token_type", datos.token_type);
                        localStorage.setItem("scope", datos.scope);
                    } else {
                        alerta.spotify("No access to web storage, spotify API won't work.");
                    }
                }
            }).catch(error => {});
        },
        request: async () => {
            if (spotifyData.inicializar){
                await fetch("https://api.spotify.com/v1/me/player/currently-playing?market=us", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
                },
                }).then(respuesta => {
                    if (respuesta.status !== 204){
                        (respuesta.json()).then((datos) => {
                            if (datos.error === undefined) {
                                spotifyAPI.process(datos.is_playing, /*datos.progress_ms, datos.item.duration_ms,*/datos.item.name, datos.item.album.images[1].url, datos.item.album.name, datos.item.artists[0].name);
                            } else {
                                spotifyAPI.refresh();
                            }
                        }).catch(error => {});
                    }
                }).catch(error => {});
            }
        },
        process: async (reproduciendo, /*progreso, duracion,*/nombre, caratula, album, artista) => {
            if (reproduciendo) {
                if (cancion.nombre != nombre) {
                    !spotifyData.activo ? spotifyData.activo = true : false;
                    cancion.artista = artista;
                    cancion.nombre = nombre;
                    cancion.album = album;
                    spotifyAPI.createCoverImg(caratula);
                }
                // Might implement this in a future update
                //if (cancion.tiempo.duracion != duracion) cancion.tiempo.duracion = duracion / 1000;
            } else {
                if (spotifyData.activo){
                    cancion.nombre = "";
                    spotify_ctx.clearRect(-30, -30, 1920, 230);
                    spotifyData.activo = false;
                }
            }
        },
        createCoverImg: (caratula) => {
            let img = new Image;
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            img.addEventListener('load', function() {
                canvas.width  = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                cancion.caratula = canvas.toDataURL();
                spotifyAPI.display();
            }, false);
            img.src = caratula;
        },
        clean: () => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
            localStorage.removeItem("expires_in");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("scope");
        },
        display: () => {
            // Cover + Song Info
            spotify_ctx.shadowBlur = 2;
            let image = new Image();
            image.src = cancion.caratula;
            setTimeout(function () {
                spotify_ctx.clearRect(-30, -30, 1920, 230);
                spotify_ctx.drawImage(image, 0, 0, 120, 120);
                cancion.caratula = "";
                spotify_ctx.font = "34px Odibee Sans";
                spotify_ctx.fillText(cancion.nombre.toUpperCase(), 140, 54);
                spotify_ctx.font = "30px Odibee Sans";
                spotify_ctx.fillText(cancion.artista, 140, 96);
            }, 100);
            // Song progress!
            /*
                Hey, you... Yes you.
                You found my secret.
                There is no song progress.
                There is me.
                DIO!
            */
        },
        stop: () => {
            spotifyData.inicializar = false;
            spotify_ctx.clearRect(-30, -30, 1920, 230);
            cancion.nombre = "";
        }
    };

    /*
            ------
            ALERTS
            ------
    */
    const alerta = {
        crear: (fecha, titulo, comentario) => {
            let pantalla = document.createElement("div");
            pantalla.classList.add("alertas");

            let contenedor = document.createElement("div");
            contenedor.classList.add("contenedorAlerta");

            let cerrar = document.createElement("a");
            cerrar.classList.add("cerrarAlerta");
            cerrar.onclick = function () {
                var parent = this.offsetParent;
                parent.style.display = "none";
                setTimeout(function () {
                    (document.getElementsByTagName("body"))[0].removeChild(parent);
                }, 200);
            }
            cerrar.appendChild(document.createTextNode("X"));

            let fecha_contenedor = document.createElement("a");
            fecha_contenedor.classList.add("fechaAlerta");
            fecha_contenedor.appendChild(document.createTextNode(fecha));

            let titulo_contenedor = document.createElement("a");
            titulo_contenedor.classList.add("tituloAlerta");
            titulo_contenedor.appendChild(document.createTextNode(titulo));

            let comentario_contenedor = document.createElement("a");
            comentario_contenedor.classList.add("comentarioAlerta");
            comentario_contenedor.innerHTML = comentario;

            contenedor.appendChild(cerrar);
            contenedor.appendChild(fecha_contenedor);
            contenedor.appendChild(titulo_contenedor);
            contenedor.appendChild(comentario_contenedor);

            pantalla.appendChild(contenedor);
            (document.getElementsByTagName("body"))[0].appendChild(pantalla);
        },
        schedule: () => {
            alerta.crear("Notification:", "", "Schedule and notes copied to clipboard!")
        },
        scheduleClean: () => {
            alerta.crear("Notification:", "", "Schedule memory wiped, reload your wallpaper.")
        },
        clima: (error) => {
            alerta.crear("Weather Error:", "", error)
        },
        spotify: (error) => {
            alerta.crear("Spotify Error:", "", error)
        },
        actualizacion: (fecha, titulo, comentario) => {
            alerta.crear(fecha, titulo, comentario);
        },
    }
}