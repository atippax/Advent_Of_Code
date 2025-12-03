
def goNorth(current)
    return [0,1] if current == nil
    return [current[0],current[1]+1]
end
def goSouth(current)
    return [0,-1] if current == nil
    return [current[0],current[1]-1]
end 
def goEast(current)
    return [1,0] if current == nil
    return [current[0]+1,current[1]]
end
def goWest(current)
    return [-1,0] if current == nil
    return [current[0]-1,current[1]]
end
def isTurnBackWalk(current,newCoordition)
    return current == newCoordition
    return false if current == nil
    return goNorth(current) == newCoordition if symbol == "v"
    return goSouth(current)== newCoordition if symbol == "^"
    return goEast(current)== newCoordition if symbol == "<"
    return goWest(current)== newCoordition if symbol == ">"
    return false
end
def walk(symbol,current)
    return goNorth(current) if symbol == "^"
    return goSouth(current) if symbol == "v"
    return goWest(current) if symbol == "<"
    return goEast(current) if symbol == ">"
    return current
end
def getHouseHasDeliver(textmap) 
    coordinates = [[0,0]]
    textmap.to_s.chars.each do |symbol|
        last_coordinate = coordinates.last
        new_coordinate = walk(symbol, last_coordinate)
        coordinates.push(new_coordinate)
    end
    return coordinates
end

def getOnlySingleHouse(coordinates)
    return coordinates.select.uniq
end 
def getHouseHasSentAtLeast1(coordinates)
    singlehouse = getOnlySingleHouse(coordinates)
    return (count(coordinates)+2) - count(singlehouse)
end 

def count(list)
    return list.length
end