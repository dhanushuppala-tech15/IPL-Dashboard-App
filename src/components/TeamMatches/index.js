// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {matchData: [], isLoading: true, bgClass: ''}

  componentDidMount() {
    this.getTeamData()
  }

  getDetailsOfMatch = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: this.getDetailsOfMatch(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getDetailsOfMatch(eachMatch),
      ),
    }
    this.setState({matchData: formattedData, bgClass: id, isLoading: false})
  }

  render() {
    const {isLoading, matchData, bgClass} = this.state
    const {teamBannerUrl, latestMatch, recentMatches} = matchData
    const bgClassName = `team-matches-container ${bgClass}`

    return (
      <div className={bgClassName}>
        {isLoading ? (
          <div data-testid="loader" className="loaderContainer">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          <div className="detailsContainer">
            <img src={teamBannerUrl} alt="team banner" className="banner" />
            <p className="latestMatchHeading">Latest Match</p>
            <LatestMatch latestMatchDetails={latestMatch} />
            <ul className="recentMatchesContainer">
              {recentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
