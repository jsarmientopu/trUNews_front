export function titleCase(str:string) {
  return str.split(' ').map(item => 
         item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ').split('.').map(item=>
                  item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join('.');
}

export function label(){
  const options=['Currently on', 'Happening on', 'Latest on', 'Search about', 'Discover']
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}