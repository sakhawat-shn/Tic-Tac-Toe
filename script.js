let table=['_','_','_','_','_','_','_','_','_'];

function draw_table()
{

	for(let i=0;i<9;i++)
	{
		document.getElementById("c"+i).innerText=(table[i]==='_'?"":table[i]);
	}
}

function empty_cell(data)
{
	let count=0;
	for(let i=0;i<9;i++)
	{
		if(data[i]=='_')
			count++;
	}
	return count;
}

function winner(data)
{
	for(let i=0;i<3;i++)
	{
		if(data[i*3]==data[i*3+1]&&data[i*3+1]==data[i*3+2])
			return data[i*3];
	}
	for(let i=0;i<3;i++)
	{
		if(data[i]==data[i+3]&&data[i+3]==data[i+6])
			return data[i];
	}
	if(data[0]==data[4]&&data[4]==data[8])
	{
		return data[0];
	}
	if(data[2]==data[4]&&data[4]==data[6])
	{
		return data[2];
	}
	return '_';
}

function check_end()
{
	if(winner(table)=='X')
	{
		if(window.confirm("Player wins.\nPlay new game?"))
		{
			new_game();
		}
		else
		{
			play=(function(){
				if(window.confirm("Please start new game to continue...."))
					{
						new_game();
					}
			});
		}
	}
	if(winner(table)=='O')
	{
		if(window.confirm("Computer wins.\nPlay new game?"))
		{
			new_game();
		}
		else
		{
			play=(function(){
				if(window.confirm("Please start new game to continue...."))
					{
						new_game();
					}
			});
		}
	}
	if(empty_cell(table)==0)
	{
		if(window.confirm("Match draw.\nPlay new game?"))
		{
			new_game();
		}
		else
		{
			play=(function(){
				if(window.confirm("Please start new game to continue...."))
					{
						new_game();
					}
			});
		}
	}
}

function new_game()
{
	for(let i=0;i<9;i++)table[i]='_';
	draw_table();
	play=turn;
}


function minimax(data,depth,max)
{
	if(winner(data)=='X')
	{
		//console.log("winner X value "+(1000-depth));
		return 1000-depth;
	}
	else if(winner(data)=='O')
	{
		//console.log("Winner O value "+(depth-1000));
		return depth-1000;
	}
	else if(empty_cell(data)==0)
	{
		//console.log("Winner none value 0");
		return 0; 
	}

	if(max)
	{
		let max=-2000;
		for(let i=0;i<9;i++)
		{
			if(data[i]=='_')
			{
				data[i]='X';
				let tmp=minimax(data,depth+1,false);
				if(max<tmp)
				{
					max=tmp;
				}
				data[i]='_';
			}
		}
		return max;
	}
	else
	{
		let min=2000;
		for(let i=0;i<9;i++)
		{
			if(data[i]=='_')
			{
				data[i]='O';
				let tmp=minimax(data,depth+1,true);
				if(min>tmp)
				{
					min=tmp;
				}
				data[i]='_';
			}
		}
		return min;
	}
}

function compute_move(data)
{
	let min=2000;
	let move=-1;
					
	for(let i=0;i<9;i++)
	{
		if(data[i]=='_')
		{
			data[i]='O';

			let tmp=minimax(data,1,true);
			console.log("For i="+i+" value found"+tmp);
			if(min>tmp)
			{
				min=tmp;
				move=i;
			}
			data[i]='_';
		}
	}

	return move;
}

function turn(user_move)
{
	if(table[user_move]!='_')
	{
		return;
	}
	table[user_move]='X';
	draw_table();
	//check_end();
	setTimeout(check_end, 0);
	let data=[];
	for(let i=0;i<9;i++)
	{
		data.push(table[i]);
	}
	let computer_move=compute_move(data);
	if(table[computer_move]!='_')
	{
		console.log('error in comp move');
	}
	table[computer_move]='O';
	draw_table();
	setTimeout(check_end, 0);
	//check_end();
}
play = turn;