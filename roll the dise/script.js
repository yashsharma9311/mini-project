document.getElementById('rollBtn').addEventListener('click', rollDice);

function rollDice() { 
    const dice = document.getElementById('dice');
    const rollBtn = document.getElementById('rollBtn');
    
    // Disable button during roll
    rollBtn.disabled = true;
    
    // Add rolling animation
    dice.classList.add('rolling');
    
    // Clear previous dots
    dice.innerHTML = '';
    
    // Wait for animation to complete
    setTimeout(() => {
        // Remove animation
        dice.classList.remove('rolling');
        
        // Generate random number 1-6
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        
        // Create dots based on the number
        createDots(dice, randomNumber);
        
        // Re-enable button
        rollBtn.disabled = false;
    }, 500);
}

function createDots(dice, number) {
    // Positions for dots on a dice face (1-6)
    const dotPositions = {
        1: [[50, 50]],
        2: [[20, 20], [80, 80]],
        3: [[20, 20], [50, 50], [80, 80]],
        4: [[20, 20], [20, 80], [80, 20], [80, 80]],
        5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
        6: [[20, 20], [20, 50], [20, 80], [80, 20], [80, 50], [80, 80]]
    };
    
    // Create dots at the specified positions
    dotPositions[number].forEach(pos => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = `${pos[0]}%`;
        dot.style.top = `${pos[1]}%`;   
        dot.style.transform = 'translate(-50%, -50%)';
        dice.appendChild(dot);
    });  
}