import React from 'react'
import { Card, Icon, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Card_ = ({dataCard}) => {
    
    const deleteMovie = async (e) => {
       let {id} = e.target;
       let url = `http://localhost:9000/user/movie/${id}`;
       e.preventDefault()
       let res = await fetch(url, {
           method: 'DELETE', 
           credentials: 'include',
           headers:{
               'Content-Type': 'application/json'
           }
       })
       let response = await res.json()
       console.log(response);
    }
    
    return (
        <Grid.Column width={4}>        
            <Card>
                <Card.Content>
                <Card.Header>{dataCard.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{dataCard.director} in {dataCard.release}</span>
                </Card.Meta>
                <Card.Description>
                    {dataCard.description}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic as={Link} to={`/movie/edit/${dataCard.ID}`}  color='green'>
                            Edit Movie
                        </Button>
                        <Button onClick={(e)=>deleteMovie(e)} id={dataCard.ID} basic color='red'>
                            Delete Movie
                        </Button>
                    </div>
                    <a>
                        <Icon name='film' />
                        {dataCard.genre}
                    </a>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default Card_