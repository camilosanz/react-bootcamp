export const Country = (props) => {
    
    const {name, capital, population, languages, flags} = props.country;
    const {temp_c, gust_kph} = props.weather.current;
    const {icon, text} = props.weather.current.condition;

    console.log(capital)
    
    return (
        <div>
            <h2>{name}</h2>
            <div>
                Capital: {capital}                
            </div>
            <div>
                Population: {population}
            </div>
            <h3>Languages</h3>
            <div>
                <ul>
                    {languages.map((language) => 
                        <li key={language.name}>{language.name}</li>
                    )}
                    
                </ul>
            </div>
            <img src={flags.png} alt={flags.svg}></img>   
            <h2>Weather in {capital}</h2>   
            <div>
                <p>Temperature: {temp_c} Celcius</p>
                <div>
                    <img src={icon} alt="none" />
                    <small>{text}</small>
                </div>
                <p>Wind: {gust_kph} kph</p>
            </div>      
        </div>
    )
  }

export default Country;