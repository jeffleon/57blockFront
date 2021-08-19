import React, { useState } from 'react'
import HeaderMenu from '../components/navBar';
import Card from './card'
import { Container, Grid } from 'semantic-ui-react'

const GetMovies = ({movies}) =>{
    let id = sessionStorage.getItem("user_id");
    let [filter, setFilter] = useState('');
    let filterMovies = movies.filter(object => object?.name.toLowerCase().includes(filter));
    
    return   (
        <div>
            <HeaderMenu 
                onItemClick={item => this.onItemClick(item)}
                items={[
                  ["Home", "/home"],
                  ["Create Movie", "/movie/register"]
                ]}
                headerIcon={"compass outline"}
                filter={filter}
                setFilter={setFilter}
            />
            <Container className="cards">
                 <Grid celled>
                    {filterMovies.map((element)=><Card key={element.ID} dataCard={element} />)}
                </Grid>
            </Container>
        </div>       
    )       
}

export default GetMovies