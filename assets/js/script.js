const countriesSection=document.querySelector('.output-countries-section');
const input=document.querySelector('.input');
const chartSection=document.querySelector('.chart-section');

const url='https://restcountries.com/v3.1/all';

let countries;
const tenCountries=[];
const fetchData= async ()=>{
    try{
        const response=await fetch(url);
        countries=await response.json();
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
    }catch(err){
        console.log(err);
    }
}
fetchData()
.then(
    input.addEventListener('keyup',e=>{
        removeAllCild();
        const value=input.value;
        const countriesArr=countries.filter(c=> c.name.common.toLowerCase().includes(value.toLowerCase()));
        showFunction(countriesArr);
        topTenCountries(countriesArr);
    })
)
function showFunction(countries){
    for(let c of countries){
        let country=document.createElement('div');
        country.className='country';
        let imgBox=document.createElement('div');
        let countryImg=document.createElement('img');
        countryImg.src=c.flags.png;
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
        population.textContent='Population : '+c.population;
        population.className='population';
        country.appendChild(population);
        countriesSection.appendChild(country);
    }
}
function topTenCountries(ctys){
    console.log(ctys);
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
        console.log(per);
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