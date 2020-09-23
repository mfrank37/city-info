let url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities;
fetch( url )
  .then( response => response.json() )
  .then( response => cities = response )
  .catch( error => console.log( `We have an Error:<< ${ error } >>` ) );
let myDiv = document.createElement( 'div' );
myDiv.setAttribute( 'class', 'results' );

myDiv.style = 'margin-right:500px;margin-left:190px;background-color:#ccf;border-radius:5px;';
const show = ( { target } ) => {
  myDiv.style.padding = "10px;";
  clearSearch();
  if( target.value === "" ) {
    document.querySelector('.results').innerHTML = `You have Inserted nothing. ${ target.children.length } result(s) found. Search for City or State`;
    return null;
  }
  
let input = document.querySelector( 'input[type="search"]' );
input.addEventListener( 'keyup', show );
document.body.appendChild( myDiv );

  let query = target.value.toLowerCase();
  query = query.replace( /\s{2,}/g, ' ' )
  query = query.trim();
  let finder = query.match( /^[a-z]/ );
  if ( finder === null ) {
    console.log( 'you have a non-string' );
    myDiv.innerHTML = `you have a non-string ${ query.charAt( 0 ) }. Please use a-zA-Z characters :)`;
    return null;
  }
  cities.forEach( city => {
   if( query === city.city.slice( 0, query.length ).toLowerCase() || query === city.state.slice( 0, query.length ).toLowerCase() ) { 
    let ul = document.createElement( 'ul' );
    ul.setAttribute( 'id', city.rank );
    ul.addEventListener( 'click', moreDetails );
    ul.setAttribute( 'class', 'ul' ); 
    const state = (st) => {
      let check = st.slice( 0, query.length ).toLowerCase();
      if( query == check )
        return `<i style='font-style:normal;background-color:#fa0;'>${ city.state.slice(0, query.length) }</i>${ st.slice(query.length) }`;
      return st;
    }
    const sCity = (ct) => {
      let check = ct.slice( 0, query.length ).toLowerCase();
      if( query == check )
        return `<i style='font-style:normal;background-color:#fa0;'>${ city.city.slice(0, query.length) }</i>${ ct.slice(query.length) }`;
      return ct;
    }        
     let liCity = document.createElement( 'li' );
     let liState = document.createElement( 'li' );
     let liPopulation = document.createElement( 'li' );
     let liGrowth = document.createElement( 'li' );
     
     liCity.innerHTML = sCity( city.city );
     liState.innerHTML = state( city.state );
     liPopulation.innerHTML = parseInt( city.population ).toLocaleString();
     liGrowth.innerHTML = growth( city.growth_from_2000_to_2013 );
     
     ul.appendChild( liCity );
     ul.appendChild( liState );
     ul.appendChild( liPopulation );
     ul.appendChild( liGrowth );
     
    myDiv.appendChild( ul );
   }
  });
  console.log( `You Now have ${myDiv.children.length} results` );
}
clearSearch = () => {
  let inputed = document.querySelector( 'input[type="search"]' );
  let myDiv = document.querySelector( '.results' );
  while ( myDiv.hasChildNodes() ) {
    myDiv.removeChild( myDiv.lastChild );
  }
}
const moreDetails = ( { target } ) => {
  let fullScreen = document.createElement( 'div' );
  fullScreen.setAttribute( 'class', 'fullScreen' );
  let displayer = document.createElement( 'div' );
  displayer.setAttribute( 'class', 'displayer' );
  let button = document.createElement( 'button' );
  button.setAttribute( 'class', 'button' );
  button.innerHTML = 'X';
  button.addEventListener( 'click', close );
  let city = parseInt( target.parentNode.id );
  city = cities[ city - 1 ];
  console.log( city );
  displayer.innerHTML = city.city;
  let ul = document.createElement( 'ul' );
  ul.innerHTML = '<br>';
  let liState = document.createElement( 'li' ); liState.innerHTML = `<b>State: </b>${ city.state }`;
  let liPopulation = document.createElement( 'li' ); liPopulation.innerHTML = ` <b>Population:</b> ${ city.population }`;
  let liGrowth = document.createElement( 'li' ); liGrowth.innerHTML = `<b>Growth From 2000 to 2013:</b> ${ growth(city.growth_from_2000_to_2013) }`;
  let liRank = document.createElement( 'li' ); liRank.innerHTML = `<b>Rank: </b> ${ city.rank }`;
  let latitude = document.createElement( 'li' ); latitude.innerHTML = `<b>Latitude:</b> ${ city.latitude }`;
  let longitude = document.createElement( 'li' ); longitude.innerHTML = `<b>Longitude:</b> ${ city.longitude }`;
  ul.appendChild( liState );
  ul.appendChild( liGrowth );
  ul.appendChild( liRank );
  ul.appendChild( latitude );
  ul.appendChild( longitude );
  displayer.appendChild( ul );
  document.body.appendChild( fullScreen );
  document.body.appendChild( displayer );
  document.body.appendChild( button );
  console.log( 'We have displayed it :)' );
}
const close = () => {
  let d = document.querySelector( 'button ');
  let di = document.querySelector( '.fullScreen ');
  let dii = document.querySelector( '.displayer ');
  document.body.removeChild( d );
  document.body.removeChild( di );
  document.body.removeChild( dii );
}
const growth = p => {
     if( parseFloat( p ) < 0 )
       return `<u style='text-decoration: none;color:red'>${ p }</u>`;
     else
       return `<u style='text-decoration: none;color:green'>${ p }</u>`;
    }
console.log( 'App success!' );