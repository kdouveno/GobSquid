
class event{
	/**
	 * type:
	 * 0 : eat
	 * 1 : kill
	 * 2 : ghost kill
	 * 
	 * 3 : Gobbit
	 */
	constructor (taper, tapped, type, beginTs){
		this.taper = taper;
		this.tapped = tapped;
		this.type = type;
		this.beginTs = beginTs;
	}
}