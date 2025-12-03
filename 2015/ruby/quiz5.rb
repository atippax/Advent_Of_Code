NOT_ALLOW_PAIRS = ["ab","cd","pq","xy"]
VOWELS=["a","e","i","o","u"]
DOUBLES = ("a".."z").to_a.map{|x| x+x }
def get_vowels(text)
    return text.chars.select{|char| VOWELS.any?(char)}
end
def get_double(text)
   return DOUBLES.select{|d| String(text).include?(d)}
end
def get_bad(text)
   return NOT_ALLOW_PAIRS.select{|d| String(text).include?(d)}
end
def is_nice(text)
    return get_vowels(text).length >= 3 && get_double(text).length >= 1 && get_bad(text).length == 0
end 
def get_same_pair(text)
    return [] if String(text).length <=4
    head, *tail = String(text).chars
    header =  head+tail[0] 
    rest = tail.join
    same = rest.scan(header)
    result = []
     if  same.length >0
        result= [same[0]]
    end
    return [*result,*get_same_pair(rest)]
end 
def get_repeat(text)
    return [] if String(text).length <3
    first, second, third, *rest = String(text).chars
    result = []
    if first == third
        result= [[first,second,third].join]
    end
    return [*result,*get_repeat([second,third].join+rest.join)]
end 

# wrong
def is_nice_v2(text)
    repeats = get_repeat(text)
    pairs = get_same_pair(text)
    list = pairs.map{|m| text.split(m).map{|g| m+g+m }}
    return false if list.length <1 
    res = repeats.any?{|a| list[0].map{|m| m.include?(a)}}
    return res
end
