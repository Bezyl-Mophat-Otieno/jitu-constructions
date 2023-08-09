
it('should be Mophat', () => {
    const name = 'Mophat'
    const truth = 'truthy'
    const falsy = 0
    
    expect(name).toBe('Mophat')
    expect(falsy).toBeTruthy()
    
});
