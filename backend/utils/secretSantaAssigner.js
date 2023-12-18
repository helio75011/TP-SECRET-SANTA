function assignSecretSantas(members) {
    let shuffled = members.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    const assignments = {};
    for (let i = 0; i < shuffled.length; i++) {
      assignments[shuffled[i]] = shuffled[(i + 1) % shuffled.length];
    }
  
    return assignments;
}
  