//to do:
// fix Tongan
// add country questions
// add fun sounds

console.log("No. languages: ", Object.keys(languages).length)
const idifficulty = ["easy", "medium", "hard", "very hard", "super hard", "whizkid"];
var difficulty = ["easy", "medium", "hard", "very hard", "super hard", "whizkid"];
var sensible = ["easy", "medium", "hard"];
var tough = ["hard", "very hard", "super hard", "whizkid"];
var script;
const validlangs = filterlanguages(languages, "difficulty", (a) => difficulty.includes(a["difficulty"]))
const sensiblelangs = filterlanguages(validlangs, "difficulty", (a) => sensible.includes(a["difficulty"]))
console.log("No. valid languages: ", Object.keys(validlangs).length)
console.log("No. sensible languages: ", Object.keys(sensiblelangs).length)

function randomno(n){
    var num = Math.floor(Math.random() * n);
    return num;
}

function removeelem(arr, e){
    for(i= 0; i < arr.length; i++){
        if (arr[i] === e) {
            var arr1 = arr.slice(0,i);
            var arr2 = arr.slice(i+1,arr.length);
            return(arr1.concat(arr2));
        }
    }
    return(arr);
}

function removelang(str){
    var string = split(str);
    var result = [];
    var resstring = ""
    for(i=0;i<string.length;i++){
        tmp = string[i];
        tmp.toLowerCase();
        if(tmp!="language"&tmp!="languages"){
        result.push(tmp);
        }
    }
    for(j=0;j<result.length;j++){
        resstring = resstring + result[j]
    }
    return(resstring)
}

function filterlanguages(obj, prop, predicate) {
    var keys = Object.keys(obj);
    var newobj = {};
    for (key in keys){
        lang = keys[key]
        var tmp = obj[lang]
        if(prop in tmp && predicate(tmp)){
        newobj[lang] = tmp;
        }
    }
    return(newobj)
}

// reference to page variables
var moreinfo;
var ref;

function filt(){
    var difficultyarr = difficultyallowed(numcorrect)
    var languagesnew = filterlanguages(languages, "difficulty", (a) => difficultyarr.includes(a["difficulty"]));
    console.log("filtered: ", languagesnew)
    var keys = Object.keys(languagesnew)
    console.log("filtered by: ", difficultyallowed(), " no. languages:", keys.length)
    var language = keys[randomno(keys.length)];
    console.log("lang = ", language)
    return(String(language))
}

function filt_cust(str, predicate){
    var difficultyarr = difficultyallowed(numcorrect)
    var l1 = filterlanguages(languages, "difficulty", (a) => difficultyarr.includes(a["difficulty"]));
    var languagesnew = filterlanguages(l1, str, predicate);
    console.log("filtered: ", languagesnew)
    var keys = Object.keys(languagesnew)
    console.log("filtered by: ", difficultyallowed(), " no. languages:", keys.length)
    var language = keys[randomno(keys.length)];
    console.log("lang = ", language)
    return(language)
}

function randomq(){
    let language = filt()
    if(typeof language === 'undefined'){
            return(randomq())
    }
    var difficultyarr = difficultyallowed(numcorrect)
    let languagefam = languages[language]["mainfam"];
    moreinfo = languages[language]["link"];
    console.log("link = ", moreinfo)
    if(languagefam=="Austroasiatic\n\nCentral Mon-KhmerKhmer"){
        languagefam="Austroasiatic"
    }
    if(languagefam != "NA" && languagefam != "cant" && !prevq.includes(language)){
        if(difficultyarr.includes(languages[language]["difficulty"])){
        return([language, languagefam]);
        } else {
        return(randomq());
        }
    }
    else {
        return(randomq());
    }
    };

    function exceptions(fam){
    if(fam=="NA" || fam.toLowerCase()=="unclassified" ||
    fam.toLowerCase()=="N" || fam.length < 4){
        return(0);
    } else {
        return(1);
    }
}

var indoeur = ["Slavic", "Baltic", "Romance", "Germanic", "Indo-Aryan", "Iranian", "Celtic"]
var ncongo = ["Bantu"]
var afroa = ["Semitic"]

function famexcept(lang, fam){
    if((fam.includes("uropean") && indoeur.includes(lang)) || (indoeur.includes(fam) && lang.includes("uropean"))){
        return(1);
    }
    if((fam.includes("ongo") && ncongo.includes(lang)) || (ncongo.includes(fam) && lang.includes("ongo"))){
        return(1);
    }
    if((fam.includes("fro") && fam.includes("siatic") && afroa.includes(lang)) || (lang.includes("fro") && lang.includes("siatic") && afroa.includes(fam))){
        return(1);
    }
    return(0);
}

function randomans(array, d){
    if(d=="easy"){
        var l1 = filterlanguages(languages, "difficulty", (a) => sensible.includes(a["difficulty"]));
    } else {
        var l1 = filterlanguages(languages, "difficulty", (a) => difficulty.includes(a["difficulty"]));
    }
    let l2 = l1
    console.log("filtered: ", l2)
    let keys = Object.keys(l2);
    let ran_key = randomno(keys.length);
    let ran_lang = String(keys[ran_key]);
    let tmp = l2[ran_lang]["mainfam"];
    let famex = famexcept(tmp, array[0])
    console.log("Family Except:" + famex + " " + tmp + array[0])
    if(array.includes(tmp) || exceptions(tmp)==0 || famex==1){
        return randomans(array, d);
    }
    let di = l2[ran_lang]["difficulty"];
    if(!sensible.includes(di)){
        return randomans(array, d);
    }
    console.log("tmp", tmp)
    if(tmp.toLowerCase()=="language isolate"){
        tmp = "Language Isolate";
    }
    console.log("randomans1: " + String(tmp))
    return tmp
};

var retries = 0;

function randomc(){
    if(retries>7){
        return("handleerror")
    }
    let language = filt_cust("vplaces", (a) => a["vplaces"]!="NA")
    let places = languages[language]["vplaces"]
    let place = languages[language]["vplaces"][0]
    console.log("lang = ", language)
    console.log("place = ", place)
    var difficultyarr = difficultyallowed(numcorrect);
    if(typeof language === 'undefined'){
        retries++
        return(randomc())
    }
    if(places=="NA" || place=="NA"){
        retries++
        return(randomc())
    }
    var pre = place.slice(0,3)
    if(language.includes(pre)){
        console.log("pre: " + pre)
        retries++
        return(randomc())
    }
    moreinfo = languages[language]["link"];
    console.log("link = ", moreinfo)
    if(!prevq.includes(language)){
        if(difficultyarr.includes(languages[language]["difficulty"])){
        return([language, places]);
        } else {
        retries++
        return(randomc());
        }
    }
    else {
        retries++
        return(randomc());
    }
};

function findc(array, d, otherplaces){
    if(d=="easy"){
        var l1 = filterlanguages(languages, "difficulty", (a) => sensible.includes(a["difficulty"]));
    } else {
        var l1 = filterlanguages(languages, "difficulty", (a) => difficulty.includes(a["difficulty"]));
    }
    let l2 = l1
    console.log("filtered: ", l2)
    let keys = Object.keys(l2);
    let ran_key = randomno(keys.length);
    let ran_lang = String(keys[ran_key]);
    let place = l2[ran_lang]["vplaces"][0];
    let corplace = otherplaces[0];
    let lang2 = ran_lang.split(" ")[0]
    if(lang2 in lang_js){
        var lang_js_places = lang_js[lang2]
    } else {
        var lang_js_places = ["NA"]
    }
    if(otherplaces.includes(place) || array.includes(place) || place=="N" || lang_js_places.includes(place)){
        return findc(array, d, otherplaces);
    }
    console.log("ans", place)
    return place
    }

    function checkendo(arr){
    for(i=0;i<arr.length;i++){
        if(arr[i].includes("(easy)")){
        return("T")
        } else {
        return("F")
        }
    }
};

function checksc(arr1, arr2){
    if(arr1.includes("Arabic")){
        return("Arabic")
    }
    if(arr1.includes("Cyrillic")){
        return("Cyrillic")
    }
    if(arr2.includes("India")){
        return("India")
    } if(arr1.includes("Latin")){
        return("Latin")
    } else {
        return(arr1[0])
    }
};

function checksc2(lan){
    if(languages[lan]["scripts"] && languages[lan]["scripts"]!="NA"){
        var sc = languages[lan]["scripts"]
        scr = checksc(sc, languages[lan]["vplaces"])
        return(scr)
    } else {
        return
    }
};

function randomn(){
    if(retries>10){
        return("handleerror")
    }
    var language = filt_cust("endonym", (a) => a["endonym"]!="NA")
    console.log("places = ", language)
    var difficultyarr = difficultyallowed(numcorrect);
    var moveforward = checkendo(languages[language]["endonym"])
    if(typeof languages[language]["endonym"]==='undefined'){
        retries++;
        return(randomn())
    }
    if(languages[language]["endonym"]==="NA" || moveforward==="T" || languages[language]["endonym"]===[]){
        retries++;
        return(randomn())
    } else {
        var endos = languages[language]["endonym"]
    }
    var pre = endos[0]
    if(typeof pre==='undefined'){
        retries++
        return(randomn())
    } else {
        pre = pre.slice(0,5)
        pre = pre.toLowerCase()
        var langsl = language.slice(0,5)
        langsl = langsl.toLowerCase()
        var langlower = language.toLowerCase()
        if(langlower.includes(pre) || pre.includes(langsl)){
        console.log("pre: " + pre)
        retries++
        return(randomn())
        }
    }
    moreinfo = languages[language]["link"];
    console.log("link = ", moreinfo)
    if(!prevq.includes(language)){
        if(difficultyarr.includes(languages[language]["difficulty"])){
        console.log("endos = ", endos)
        scripts = checksc2(language)
        return([endos, language]);
        } else {
        retries++
        return(randomn());
        }
    }
    else {
        retries++
        return(randomn());
    }
};

// by script
function findl(array){
    let ran_lang = filt()
    var scri = checksc2(ran_lang)
    if(ran_lang.includes("language")){
        var pos = String(ran_lang.indexOf(" language"))
        var lang = ran_lang.slice(0, pos)
    }
    else {
        var lang = ran_lang
    }
    if(lang=="N" || lang=="NA" || array.includes(lang)){
        return findl(array);
    }
    if(scripts){
        if(scripts!="Latin" && scripts!="latin" && scripts==scri){
        return findl(array);
        }
    }
    console.log("ans", lang)
    return lang
};

function subarray(array, start, finish){
    var tmp = array;
    return tmp.slice(start, finish);
};

function randomqtype(){
    var ran_key = randomno(3);
    var questiontypes = ["where", "what", "name"]
    return(questiontypes[ran_key]);
};

function makearray(num){
    array = []
    for(i = 1;i < num+1; i++){
        array.push(i);
    }
    return(array)
};

function diffhelp(){
    j = 1
    for(i=0;i<amount.length;i++){
        if(numcorrect > amount[i]){
        j++;
        }
    }
    return(j)
};

function difficultyallowed(){
    j = diffhelp()
    m = Math.max(0, j-2)
    var tmp = difficulty
    return(tmp.slice(m,j));
};

function determinescore(){
    j = diffhelp()
    return(100 * j)
};

// add a "start at" option
// add passwords to start at higher
// add more options as questions get harder
var amount = [7, 18, 25, 50, 75, 100];

var prevq = [];

var numcorrect = 0;

var lives = 3;

var score = 0;

var highscore = 0;

var qno = 5;

var qarray = makearray(qno);

function randompos(init, ref){
    if(ref.length>0){
        position = randomno(ref.length);
        pos = init[position];
        newref = removeelem(ref, ref[position]);
        newinit = removeelem(init, pos);
        array1 = [pos];
        if(ref.length===1) {
        return(array1)
        } else {
        return (array1.concat(randompos(newinit, newref)));
        }
    }
};

function getquestion1(){
    var array = []
    var ques = randomq()
    var dif;
    if(numcorrect < 30){
        dif = "easy"
    } else {
        dif = "tough"
    }
    array.push(String(ques[1]))
    for(i=0; i < (qno - 1); i++){
        tmp = randomans(array, dif);
        array.push(tmp);
    }
    console.log("getquestion1 " + String(ques[0]) + " " + String(array))
    return([ques[0], array]);
};

function getquestion2(){
    var array = []
    var ques = randomc()
    var dif;
    if(numcorrect < 30){
        dif = "easy"
    } else {
        dif = "tough"
    }
    array.push(String(ques[1][0]))
    for(i=0; i < (qno - 1); i++){
        tmp = findc(array, dif, ques[1]);
        array.push(tmp);
    }
    console.log("getquestion2 " + String(ques[0]) + " " + String(array))
    return([ques[0], array]);
};

var text;

function getquestion3(){
    var array = []
    var ques = randomn()
    text = ques[1]
    if(ques[1].includes("language")){
        var pos = String(ques[1].indexOf(" language"))
        var lang = ques[1].slice(0, pos)
    }
    else {
        var lang = ques[1]
    }
    array.push(lang)
    for(k=0; k < (qno - 1); k++){
        tmp = findl(array);
        array.push(tmp);
        console.log("q3 array: " + String(array) + " no: " + k)
    }
    console.log("getquestion3 " + String(ques[1]) + " " + String(array))
    return([ques[0], array, ques[1]]);
};

function getquestion(){
    retries = 0;
    type = randomqtype()
    if(type=="name"){
        console.log("NAME")
        return(getquestion3())
    }
    if(type=="where"){
        var r = getquestion2()
        console.log("r:" + r)
        if(r=="handleerror" || typeof r[0] === 'undefined' || retries >= 7){
        console.log("HANDLEERROR")
        type = "what";
        return(getquestion1());
        } else {
        return(r)
        }
    }
    else {
        return(getquestion1())
    }
};

function makeplural(str, key){
    if(key=="sg"){
        return(str)
    } else {
        var newstr
        strprime = str.replace(" does ", " do ")
        newstr = strprime.replace(" is ", " are ")
        return(newstr)
    }
};

function islangthere(la){
    if(language.includes("language")){
        return(la)
    } else {
        newla = la.concat(" language")
        return(newla)
    }
};

function setqtext(num, answers, language){
    if(language.includes("languages")){
        var plur = "pl"
    } else {
        var plur = "sg"
    }
    if(type=="what"){
        lan = islangthere(language)
        desiredstr = "What <u>family</u> does the " + lan + " belong to?"
        stri = makeplural(desiredstr, plur)
        document.getElementById("question").innerHTML = stri;
    }
    if(type=="where") {
        lan = islangthere(language)
        desiredstr = "The " + lan + " is spoken in which of the following <u>countries</u>?";
        stri = makeplural(desiredstr, plur)
        document.getElementById("question").innerHTML = stri;
    }
    if(type=="name"){
        console.log("Endonym setq!")
        console.log(language)
        if(Array.isArray(language) || language instanceof Array){
        console.log("Endonym works!")
        var endonym = ""
        mx = Math.min(language.length, 1)
        for(i=0;i<mx;i++){
            endonym = endonym.concat(language[i],"<br>")
        }
        if(endonym.charCodeAt(0)>400){
            let tmp = endonym;
            for(c=0;c<endonym.length;c++){
            if(endonym.charCodeAt(c)<400){
                tmp = tmp.slice(0,c)
                break
            }
            }
            endonym = tmp
        }
        if(correct=="Yoruba"){
            endonym="\u00c8d\u00e8 Yor\u00f9b\u00e1"
        }
        document.getElementById("question").innerHTML = "What language is shown in the <u>text</u> below?<br><br>" + endonym
        } else {
        nextquestion()
        }
    }
    for(i=1;i<num+1;i++){
        string = "q." + String(i);
        j = i - 1;
        console.log(string)
        document.getElementById(string).textContent = answers[j];
    }
};

var language;
var correct;
var answers;
var feedback;
var type;
var mod = document.getElementsByClassName("modal")[0];
var intro = document.getElementsByClassName("modal")[1];
var openedpg = 0;
var soundon = 1;
var icon = document.getElementById("sound");

function replacetext(){
    var q = getquestion();
    if(type=="what" || type=="where"){
        language = q[0];
        prevq.push(language);
    } else {
        language = q[0];
        prevq.push(q[2]);
    }
    correct = q[1][0];
    answers = randompos(q[1], qarray, q[1].length);
};
// need interactive elements (click, check correct, etc.)

function getscore(){
    document.getElementById("score").innerHTML = String(score)
    document.getElementById("lives").innerHTML = String(lives)
    document.getElementById("hscore").innerHTML = String(highscore)
    };

    var rightsound = new sound("Contents/sounds/up.wav", "up")
    var downsound = new sound("Contents/sounds/down.wav", "down")
    var losesound = new sound("Contents/sounds/lose.wav", "lose")

    function load(){
        prevq = [];
        lives = 3;
        score = 0;
        qno = 5;
        numcorrect = 0;
        document.getElementsByClassName("continue")[0].textContent = ">>"
        replacetext();
        setqtext(qno, answers, language)
        getscore();
        if(openedpg===0){
            toggleintro()
            openedpg = 1
        }
        var x = document.getElementById("cover");
        x.style.display="none"
    };

    // only listen for some keyboard presses
    addEventListener("keydown", function(event) {
        var code = event.which || event.keyCode;
        console.log(code==32);
        if(code===32 || code===13){
            if (mod.classList.contains('show') && lives==0) {
            togglemodal();
            load();
            return;
            }
            else if (mod.classList.contains('show')) {
            togglemodal();
            return;
            }
            else {
            return;
            }
        } else {
            return;
        }
    });

    addEventListener("keyup", function(event) {
        return;
    });

    // Click events
    window.onclick = function(event) {
        var e = event.target
        console.log(e)
        if (event.target.id==="sound_img" || event.target.id==="sound" || event.target.matches("div.image")) {
        soundtoggle()
        }
        if (event.target.matches('button.submit')) {
        if(type=="name"){
            ref = "Read more about " + text + " on <a href=" + moreinfo + " target=\"_blank\">Wikipedia</a>";
        } else {
            ref = "Read more about " + language + " on <a href=" + moreinfo + " target=\"_blank\">Wikipedia</a>";
        }
        if(lives>0){
            if(event.target.textContent == correct){
            soundplay(rightsound)
            addition = determinescore()
            score = score + addition;
            numcorrect += 1;
            feedback = "Correct! Nice job :) <br>Current score: " + score
            removeblur(qno);
            togglemodal();
            nextquestion();
            return
            } else {
            lives -= 1;
            if(lives>0){
                soundplay(downsound)
                feedback = "Incorrect... Better luck on the next one! <br>Current score: " + score + "<br>The correct answer is: " + correct
                removeblur(qno);
                togglemodal();
                nextquestion();
                return
            }
            else{
                soundplay(losesound)
                document.getElementById("lives").innerHTML = String(lives)
                document.getElementsByClassName("continue")[0].textContent = "Play Again?"
                feedback = "The correct answer is: " + correct + "<br>All out of lives :( <br>You scored: " + String(score)
                if(score > highscore){
                highscore = score;
                document.getElementById("hscore").innerHTML = String(lives)
                }
                removeblur(qno);
                togglemodal();
                return
            }
            }
        }
        }
        if (intro.classList.contains('show') && (event.target.matches('.continue') || event.target == intro)) {
            removeblur(qno);
            toggleintro();
            return
        }
        if (mod.classList.contains('show') && lives==0 && (event.target.matches('.continue') || event.target == mod)) {
            removeblur(qno);
            togglemodal();
            load();
            return
        }
        else if (mod.classList.contains('show') && (event.target.matches('.continue') || event.target == mod)) {
            removeblur(qno);
            togglemodal();
            return
        }
    };

function soundtoggle(){
    console.log("toggling sound");
    if(soundon===1){
        soundon = 0
        downsound.muted = true;
        rightsound.muted = true;
        icon.src = "Contents/no_sound_icon.png"
    } else {
        soundon = 1
        downsound.muted = false;
        rightsound.muted = false;
        icon.src = "Contents/sound_on_icon.png"
    }
};

function soundplay(sound){
    if(soundon===1){
        sound.play()
    }
};

function togglemodal(){
    console.log("modal activated")
    var f = document.getElementById("feedback")
    var l = document.getElementById("moreinfo")
    f.innerHTML = feedback;
    l.innerHTML = ref;
    mod.classList.toggle("show");
    removeblur(qno);
};

function toggleintro(){
    openedpg += 1
    console.log("intro activated")
    intro.classList.toggle("show");
    removeblur(qno);
};

function nextquestion(){
    var x = document.getElementById("cover");
    x.style.display="block";
    replacetext();
    setqtext(qno, answers, language)
    getscore();
    x.style.display="none";
};

function removeblur(num){
    for(i=1;i<num+1;i++){
        string = "q." + String(i);
        j = i - 1;
        document.getElementById(string).blur();
    }
};

// sound:
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src, name) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("crossOrigin","anonymous");
    this.sound.style.display = "none";
    this.sound.setAttribute("id", name)
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
};