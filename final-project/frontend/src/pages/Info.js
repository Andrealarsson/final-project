import React from 'react'
import styled from 'styled-components/macro'
import Navbar from '../components/Navbar'
import paris from '../assets/paris.jpg'

const Info = () => {

  return(
    <>
    <InfoSection>
    <Navbar/>
    <InfoContainer>
      <InfoTitle>Förberedelser inför resan </InfoTitle>
      <Title>Se till att vara försäkrad</Title>
        <Link href='https://www.konsumenternas.se/forsakringar/reseforsakringar/'>
        <Text>Om olyckan är framme och du saknar försäkring kan din resa bli väldigt dyr. 
        De flesta hemförsäkringar har ett reseskydd som täcker 45 dygn. Men det räcker inte alltid.
        Ring ditt försäkringsbolag och fråga exakt vad som gäller. Ingår till exempel kostnad för 
        sjukhusvård och hemtransport vid dödsfall? Har du ingen hemförsäkring bör du köpa en separat 
        reseförsäkring. Visst försäkringsskydd kan ingå när du betalat din resa med ett bankkort. 
        Kontakta din bank för närmare besked om de villkor som gäller. Allmän information om försäkringar 
        finns på Konsumenternas försäkringsbyrås sida {'>>'}
        </Text>
        </Link> 

        <Title>Europeiska sjukförsäkringskortet</Title>
        < Link href='https://www.forsakringskassan.se/privatpers/resa_arbeta_studera_eller_fa_vard_utomlands/resa_utomlands'>
        <Text>Ta med det europeiska sjukförsäkringskortet om 
        du ska resa inom EU/EES-land eller Schweiz. Kortet beställer man hos Försäkringskassan. 
        Läs mer om kortet på Försäkringskassans webbplats {'>>'}
        </Text>
        </Link>
          
        <Title>Visum till andra länder</Title>
        <Link href='https://www.swedenabroad.se/sv/'>
          <Text>En svensk medborgare behöver visum för att besöka vissa länder. UD ansvarar inte för detta, utan vänd dig 
          till landets ambassad, konsulat eller till din resebyrå i god tid innan avresa {'>>'}
        </Text>
        </Link>
         
        <Title>Behövs vaccination</Title>
        <Link href='https://www.1177.se/Vastra-Gotaland/'>
          <Text>Innan du reser till något land utanför Europa är det viktigt att du ser över vilka vaccinationer du behöver. 
          Många länder kräver att man har ett intyg om vaccination mot vissa sjukdomar för att få resa in.
          Gå in på reseinformation från Sveriges ambassader och läs mer om hälsa och vaccinationer från 1177 Vårdguiden 
          för information om ditt resmål {'>>'}
        </Text>
        </Link>
         
        <Title>Pass och ID-kort</Title>
        <Link href='https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/'>
          <Text>Innan du reser utomlands bör du kontrollera att du har en giltig resehandling (pass- eller nationellt id-kort). 
          Du behöver alltid pass, eller inom Schengenområdet ett nationellt id-kort. Trots att passkontroll endast sker i 
          undantagsfall inom Schengenområdet måste du kunna legitimera dig under utlandsvistelsen.
          Pass och det nationella id-kortet är de enda giltiga handlingar som styrker din identitet och ditt medborgarskap. 
          Körkort är inte en resehandling.
          Vid resor inom Norden krävs inte pass för svenska medborgare men du bör ändå ha med dig giltig legitimation, för 
          att styrka din identitet.
          Kontrollera att din resehandling är i gott skick inför utlandsresan. Du kan komma att nekas inresa i ett annat 
          land om din resehandling är skadad. Observera att vissa länder kräver 6 månaders kvarvarande giltighetstid i pass 
          vid hemresa.
          Om du tappar bort eller blir bestulen på din resehandling under utlandsvistelsen ska du kontakta svenska ambassaden 
          eller konsulatet där du befinner dig. Om du snabbt vill anmäla förlusten kan du också kontakta Polisens kontaktcenter, 
          tel +46 77 114 14 00 och göra en förlustanmälan. Resehandlingen spärras då samtidigt som ingen obehörig kan använda 
          sig av den. På ambassaden eller konsulatet kan du skaffa ett provisoriskt pass som gäller för en resa, oavsett om 
          det är till Sverige eller annat land. Det finns dock vissa länder som inte tillåter in- eller genomresa på ett 
          provisoriskt pass, liksom att det kan krävas visering. Du bör därför kontakta respektive lands ambassad dit du ska 
          fortsätta resan för att höra vad som gäller vid innehav av provisoriskt pass.
          Du kan även ansöka om ett nytt ordinarie pass på de flesta ambassader men det kan ta ett par veckor att få eftersom 
          alla ordinarie pass utfärdas i Sverige. Finns det ingen svensk representation i landet kan en svensk medborgare få 
          hjälp av ett annat EU-lands representation. Där kan man få hjälp med ett europeiskt resedokument (European Travel 
          Document, ETD) för en enkel resa till Sverige.
          Att söka resehandling utomlands är dyrare än i Sverige eftersom omkostnaderna är större. Avgifterna regleras av 
          en avgiftsförordning som gäller från den 1 mars 2020.
          Avgiften för resehandlingen betalas samtidigt som du ansöker om den. Om du vill hämta det nya ordinarie passet 
          eller id-kortet på en annan ambassad än där du ansökt, eller på ett konsulat, tillkommer en extra utlämningsavgift på 200:-.
          Avgifter utomlands:
          •	Vanligt pass: 1600:-
          •	Provisoriskt pass: 1800:-
          •	Nationellt id-kort: 1600:-
          Tips: Ta en kopia på ditt pass och bär med dig {'>>'}
        </Text>
        </Link>
    </InfoContainer>
    </InfoSection>
    </>
  )
}
export default Info

const InfoSection = styled.section`
background-image: url('${paris}');
height: 100vh;
display: flex; 
align-items: center;
justify-content: center;
flex-direction: column;
`
const InfoContainer = styled.div`
text-decoration: none;
width: 80%;
margin: 70px, 0px;
padding: 20px;
flex-direction: row;
align-items: center;
background-color: #ffffff;

@media (min-width: 768px) {
  max-width: 800px;
}
`
const Link = styled.a`
text-decoration: none;
`

const InfoTitle = styled.h1`
font-size: 20px;
`

const Title= styled.h2`
font-size: 18px;
margin-top: 20px;`

const Text = styled.p`
font-size: 13px;
color: #000000;
`
