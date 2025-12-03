def multiple(s1,s2)
    return s1*s2
end
def findEachSide(s1,s2)
    return 2 * multiple(s1,s2)
end
def findPaper(l,w,h)
    return findEachSide(l,w)  + findEachSide(w,h)  + findEachSide(h,l)
end
def findFeet(l,w,h)
    return [multiple(l,w) , multiple(w,h), multiple(h,l)].min
end
def findAPaper(l,w,h)
   return findPaper(l,w,h) + findFeet(l,w,h) 
end
def findFeetRibbon(l,w,h)
    return l*w*h
end
def findLine(l,w)
    return 2*l+2*w
end
def findRibbon(l,w,h)
    return findFeetRibbon(l,w,h) + findLine(*[l,w,h].sort.take(2))
end
data = File.read("./input.txt")