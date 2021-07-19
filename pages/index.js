import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as='aside'>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      
      <hr/>

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            {props.title} ({props.items.length})
        </h2>
         </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = "pezzutti";
  const favoritePeople = ['juunegreiros','omariosouto','peas','rafaballerini','marcobrunodev','felipefialho'];

  const [communities, setCommunities] = React.useState([]);
  
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(function() {
    fetch('https://api.github.com/users/pezzutti/followers')
    .then(function (serverReturn){
      return serverReturn.json();
    })
    .then(function (convertedReturn){
      setFollowers(convertedReturn);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'f6259b560cacae94831c390584407f',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            id
            title
            imageUrl
          }
        }`
      })
    })
    .then((response) => response.json())
    .then((convertedReturn) => {
      const datoCommunities = convertedReturn.data.allCommunities

    setCommunities(datoCommunities)
    })

  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={ function handleCreateCommu(e) {
              e.preventDefault();
              const formData = new FormData(e.target);
              const community = {
                title: formData.get('title'),
                image_url: formData.get('image'),
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(community)
              })
              .then(async (response) => {
                const data = await response.json();
                const community = data.register;
                setCommunities([...communities, community]);
              })
            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar Comunidade
              </button>
            </form>

          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguidores" items={followers}/>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({communities.length})
          </h2>

              <ul>
                {communities.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/communities/${itemAtual.title}`} >
                        <img src={itemAtual.imageUrl}/>
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favoritePeople.length})
            </h2>

              <ul>
                {favoritePeople.map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`/users/${itemAtual}`} key={itemAtual}>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>
        </div>
     </MainGrid>
    </>
  )
}
