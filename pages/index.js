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

export default function Home() {
  const githubUser = "pezzutti";
  const favoritePeople = ['juunegreiros','omariosouto','peas','rafaballerini','marcobrunodev','felipefialho'];
  const [communities, setCommunities] = React.useState([{
    id: '666',
    title: 'Linkin Park', 
    image: 'https://scontent.fcpq3-1.fna.fbcdn.net/v/t1.6435-9/74524015_1203061413227846_2675564737630044160_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=CMQ9NSQteNwAX-LF3mU&_nc_ht=scontent.fcpq3-1.fna&oh=35efb4a7c890e06f9dd973a33f5fd6b1&oe=60FAAA0B'
  }]);

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
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image')
              }
            
              setCommunities([...communities, community]);

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
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            Comunidades ({communities.length})
        </h2>

            <ul>
              {communities.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} >
                      <img src={itemAtual.image}/>
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
