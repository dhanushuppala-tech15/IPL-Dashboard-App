// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Legend, Cell} from 'recharts'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
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

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  // Data for Pie chart: Won / Lost / Draw
  getMatchStatsData = () => {
    const {teamMatchesData} = this.state
    const {recentMatches = []} = teamMatchesData

    const wonCount = recentMatches.filter(
      eachMatch => eachMatch.matchStatus === 'Won',
    ).length

    const lostCount = recentMatches.filter(
      eachMatch => eachMatch.matchStatus === 'Lost',
    ).length

    const drawCount = recentMatches.length - (wonCount + lostCount)

    return [
      {name: 'Won', value: wonCount},
      {name: 'Lost', value: lostCount},
      {name: 'Draw', value: drawCount},
    ]
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches = []} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData
    const statsData = this.getMatchStatsData()

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />

        {/* Latest Match Details */}
        <LatestMatch latestMatchData={latestMatch} />

        {/* Pie Chart for match statistics */}
        <div className="chart-container">
          <h2 className="chart-heading">Match Statistics</h2>
          {/* IMPORTANT: Use PieChart directly with fixed width/height for tests */}
          <PieChart width={400} height={300}>
            <Pie
              data={statsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {statsData.map(entry => (
                <Cell key={`cell-${entry.name}`} />
              ))}
            </Pie>
            {/* Legend from recharts -> tests expect legends here */}
            <Legend />
          </PieChart>
        </div>

        {/* Back Button */}
        <button type="button" onClick={this.onClickBack}>
          Back
        </button>

        {/* Recent Matches List */}
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
