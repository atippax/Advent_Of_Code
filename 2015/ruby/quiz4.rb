
require 'digest'

def fillZeros(target)
    return "".rjust(target, "0")
end

def hashing(input)
    return Digest::MD5.hexdigest(input)
end 

def makeNumberTOInputHash(value,target_length)
    return value.to_s.rjust(target_length, '0')
end

def mining(input,number)
    hash = hashing(input+number.to_s)    
    while !hash.start_with?(fillZeros(6)) do 
        number+=1
        hash = hashing(input+number.to_s)    
    end
    execution_time = end_time - start_time
    return number
end