const countriesSection=document.querySelector('.output-countries-section');
const input=document.querySelector('.input');
const chartSection=document.querySelector('.chart-section');
const nameBtn=document.getElementById('name-btn');
const areaBtn=document.getElementById('area-btn');
const populationBtn=document.getElementById('population-btn');
const nameBtnIcon=document.getElementById('namebtn-icon');
const areaBtnIcon=document.getElementById('areabtn-icon');
const populationBtnIcon=document.getElementById('populationbtn-icon');
const clearBtn=document.getElementById('clear-btn');


const url='https://restcountries.com/v3.1/all';

let countries;
let countriesArr;
const tenCountries=[];
const fetchData= async ()=>{
    try{
        const response=await fetch(url);
        countries=await response.json();
        console.log(countries);
        let sortedcountries=await countries.sort((a,b)=>{
            if(a.population>b.population) return -1;
            else if(a.population<b.population) return 1;
            else return 0;
        });
        for(let i=0;i<10;i++){
            tenCountries.push(sortedcountries[i]);
        }
        showFunction(countries);
        topTenCountries(tenCountries);
        nameBtn.addEventListener('click',e=>{

            let arr,multiArr;
            if(countriesArr){
                arr=countriesArr;
            }else{
                arr=countries;
            }
            const sortedArr=arr.sort((a,b)=>{
                if(a.name.common>b.name.common) return 1;
                else return -1;
            });
            if(!nameBtnIcon.className){
                multiArr=sortedArr.sort();
                nameBtnIcon.className='fa-solid fa-arrow-down-long';
            }else{
                if(nameBtnIcon.className=='fa-solid fa-arrow-down-long'){
                    multiArr=sortedArr.reverse();
                    nameBtnIcon.className='fa-solid fa-arrow-up-long';
                }else{
                    multiArr=sortedArr.sort();
                    nameBtnIcon.className='fa-solid fa-arrow-down-long';
                }               
            }
            removeCountriesOutput();
            showFunction(multiArr);
            areaBtnIcon.className='';
            populationBtnIcon.className='';
        });
        areaBtn.addEventListener('click',e=>{
            let arr,multiArr;
            if(countriesArr){
                arr=countriesArr;
            }else{
                arr=countries;
            }
            const sortedArr=arr.sort((a,b)=>{
                if(!a.area){
                    return 1;
                }else{
                    if(a.area>b.area) return -1;
                    else return 1;
                }
            });
            if(!areaBtnIcon.className){
                multiArr=sortedArr.sort();
                areaBtnIcon.className='fa-solid fa-arrow-down-long';
            }else{
                if(areaBtnIcon.className=='fa-solid fa-arrow-down-long'){
                    multiArr=sortedArr.reverse();
                    areaBtnIcon.className='fa-solid fa-arrow-up-long';
                }else{
                    multiArr=sortedArr.sort();
                    areaBtnIcon.className='fa-solid fa-arrow-down-long';
                }
                
            }
            removeCountriesOutput();
            showFunction(multiArr);
            nameBtnIcon.className='';
            populationBtnIcon.className='';
        })
        populationBtn.addEventListener('click',e=>{

            let arr,multiArr;
            if(countriesArr){
                arr=countriesArr;
            }else{
                arr=countries;
            }
            const sortedArr=arr.sort((a,b)=>{
                if(a.population>b.population) return -1;
                else return 1;
            });
            if(!populationBtnIcon.className){
                multiArr=sortedArr.sort();
                populationBtnIcon.className='fa-solid fa-arrow-down-long';
            }else{
                if(populationBtnIcon.className=='fa-solid fa-arrow-down-long'){
                    multiArr=sortedArr.reverse();
                    populationBtnIcon.className='fa-solid fa-arrow-up-long';
                }else{
                    multiArr=sortedArr.sort();
                    populationBtnIcon.className='fa-solid fa-arrow-down-long';
                }               
            }
            removeCountriesOutput();
            showFunction(multiArr);
            areaBtnIcon.className='';
            nameBtnIcon.className='';
        });
    }catch(err){
        console.log(err);
    }
}
fetchData()
.then(function(){
    document.querySelector('.spinner-wrapper').style.display='none';
    document.querySelector('.output-chart-section').style.display='block';
})
.then(
    input.addEventListener('keyup',e=>{
        removeAllCild();
        const value=input.value;
        if(value){
            clearBtn.style.display='block';
        }else{
            clearBtn.style.display='none';
        }
        countriesArr=countries.filter(c=> c.name.common.toLowerCase().includes(value.toLowerCase()));
        showFunction(countriesArr);
        topTenCountries(countriesArr);
    })
)
.then(
    clearBtn.addEventListener('click',e=>{
        removeAllCild();
        showFunction(countries);
        topTenCountries(tenCountries);
        input.value='';
        clearBtn.style.display='none';
        countriesArr=null;
    })
)
function showFunction(countries){
    for(let c of countries){
        let country=document.createElement('div');
        country.className='country';
        let imgBox=document.createElement('div');
        let countryImg=document.createElement('img');
        if(c.flags){
            countryImg.src=c.flags.png;
        }
        imgBox.appendChild(countryImg);
        country.appendChild(imgBox);
        let name=document.createElement('h5');
        name.textContent=c.name.common;
        name.className='name';
        country.appendChild(name);
        if(c.capital){
            let capital=document.createElement('h5');
            capital.textContent='Capital : '+c.capital[0];
            capital.className='capital';
            country.appendChild(capital);
        }
        let language=document.createElement('h5');
        language.className='language';
        if(c.languages){
            let lan=Object.values(c.languages);
            if(lan.length>1){
                let languages=lan.toString();
                language.textContent='Languages : '+languages;
                country.appendChild(language);
            }else{
                language.textContent='Languages : '+lan[0];
                country.appendChild(language);
            }
        }
        let population=document.createElement('h5');
        let populationValue=numberWithCommas(c.population)
        population.textContent='Population : '+populationValue;
        population.className='population';
        country.appendChild(population);
        let area=document.createElement('h5');
        let areaValue=numberWithCommas(c.area);
        area.textContent='Area : '+ areaValue;
        area.className='area';
        country.appendChild(area);
        let region=document.createElement('h5');
        region.textContent='Region : '+c.region;
        region.className='region';
        country.appendChild(region);
        if(c.currencies){
            let currencies=document.createElement('h5');
            let cur=Object.values(c.currencies);
            if(cur.length>1){
                let currency=[];
                for(let i of cur){
                    currency.push(i.symbol);
                }
                currencies.textContent='Currency : '+currency.join(' , ');
            }else{
                currencies.textContent='Currency : '+cur[0].symbol;
            }
            country.appendChild(currencies);
        }
        countriesSection.appendChild(country);
    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function topTenCountries(ctys){
    let worldPopulation=0;
    for(let c of countries){
        worldPopulation+=c.population;
    }
    const world=document.createElement('div');
    world.className='country';
    const worldNameField=document.createElement('div');
    const worldNameValue=document.createElement('span');
    worldNameField.className='name';
    worldNameValue.textContent='World';
    worldNameField.appendChild(worldNameValue);
    const populationField=document.createElement('div');
    const populationValue=document.createElement('span');
    populationField.className='population';
    populationValue.textContent=worldPopulation;
    populationField.appendChild(populationValue);
    const graph=document.createElement('div');
    graph.className='graph';
    const graphFill=document.createElement('div');
    graphFill.style.backgroundColor='#F2A93B';
    graphFill.style.width='100%';
    graphFill.style.height='100%';
    graph.appendChild(graphFill);
    world.appendChild(worldNameField);
    world.appendChild(graph);
    world.appendChild(populationField);
    chartSection.appendChild(world);
    for(let c of ctys){
        const name=c.name.common;
        const population=c.population;
        const country=document.createElement('div');
        country.className='country';
        const nameField=document.createElement('div');
        const nameValue=document.createElement('span');
        nameField.className='name';
        nameValue.textContent=name;
        nameField.appendChild(nameValue);
        const populationField=document.createElement('div');
        const populationValue=document.createElement('span');
        populationField.className='population';
        populationValue.textContent=population;
        populationField.appendChild(populationValue);
        const graph=document.createElement('div');
        graph.className='graph';
        const graphFill=document.createElement('div');
        const per=population/worldPopulation*100;
        graphFill.style.backgroundColor='#F2A93B';
        graphFill.style.width=`${per}%`;
        graphFill.style.height='100%';
        graph.appendChild(graphFill);
        country.appendChild(nameField);
        country.appendChild(graph);
        country.appendChild(populationField);
        chartSection.appendChild(country);
    }
}
function removeAllCild(){
    while(countriesSection.firstChild){
        countriesSection.removeChild(countriesSection.firstChild);
    }
    while(chartSection.firstChild){
        chartSection.removeChild(chartSection.firstChild);
    }
}
function removeCountriesOutput(){
    while(countriesSection.firstChild){
        countriesSection.removeChild(countriesSection.firstChild);
    }
}

//scroll top function
const mybutton=document.getElementById('scrollTop-btn');
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }