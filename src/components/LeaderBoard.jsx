import { React } from 'react';
import one from '../assets/1st-prize.png'; 
import two from '../assets/2nd-place.png';
import three from '../assets/3rd-place.png';
import rankers from '../assets/trophy-star.png'

const TeamRow = ({ team }) => (
    <div key={team.rank} className="flex items-center justify-between px-4 mb-4 border-2 rounded-xl border-yellow-500 w-full lg:w-[75%] bg-black hover:bg-yellow-500">
        <div className="flex items-center">
            <p className="w-1/4 text-lg">{team.rank}</p>
            <img src={team.photo} alt="Team" className=" h-12 mx-4" /> 
            <p className="mx-4 whitespace-nowrap text-lg">{team.name}</p>
        </div>
        <p className="text-lg">{team.score} pts</p>
    </div>
);

function LeaderBoard() {
    const teams = [
        { rank: 1, name: 'Team A', score: 15 ,photo: one },
        { rank: 2, name: 'Team B', score: 90, photo: two}, 
        { rank: 3, name: 'Team C', score: 80, photo: three},
        { rank: 4, name: 'Team D', score: 70, photo: rankers},
        { rank: 5, name: 'Team E', score: 60, photo: rankers },
        { rank: 6, name: 'Team F', score: 50, photo: rankers },
        { rank: 7, name: 'Team G', score: 40, photo: rankers },
        { rank: 8, name: 'Team H', score: 30, photo: rankers },
        { rank: 9, name: 'Team I', score: 20, photo: rankers },
        { rank: 10, name: 'Team J', score: 10, photo: rankers },
    ];

    return (
        <div className='flex flex-col text-white '>
            <div className="flex items-center mb-4 border-b p-4">
                <h1 className="text-4xl ml-4 text-#FFC200">Leaderboard</h1>
            </div>
            <div className='flex flex-col h-screen'>
                <div className="flex flex-col items-center mb-4 p-4 bg-#FFC200 text-white h-1/4">
                    <div className='rounded-full border-yellow-500 border-4'>
                        <img src={teams[0].photo} alt="trophy" className="w-20 h-20 p-2 " />
                    </div>
                    <h2 className="text-2xl">{teams[0].name}</h2>
                    <p>{teams[0].score} points</p>
                </div>
                <div className="custom-scrollbar flex flex-col items-center p-4 bg-[#6F6D6D]  h-3/4 rounded-t-[24px] overflow-auto">
                    {teams.slice(1).map((team) => <TeamRow team={team} />)}
                </div>
            </div>
        </div>
    );
}

export default LeaderBoard;