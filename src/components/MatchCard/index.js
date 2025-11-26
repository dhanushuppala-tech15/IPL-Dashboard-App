// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  console.log(matchDetails)
  const {result, competingTeamLogo, matchStatus, competingTeam} = matchDetails

  return (
    <li className="match-card">
      <img
        className="team-logo-img"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={`${matchStatus}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
