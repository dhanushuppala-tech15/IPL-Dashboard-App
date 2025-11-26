// Write your code here

import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestMatchDetails

  return (
    <div className="matchDetailsContainer">
      <div className="logoVenueCont">
        <div className="teamVenueContainer">
          <p className="competingHeading">{competingTeam}</p>
          <p className="description">{date}</p>
          <p className="description">{venue}</p>
          <p className="description">{result}</p>
        </div>
        <img
          className="latestTeamLogo"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <hr className="hrLine" />
      <div className="inningsCont">
        <p className="description">First Innings</p>
        <p className="description">{firstInnings}</p>
        <p className="description">Second Innings</p>
        <p className="description">{secondInnings}</p>
        <p className="description">Man of the Match</p>
        <p className="description">{manOfTheMatch}</p>
        <p className="description">Umpires</p>
        <p className="description">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
