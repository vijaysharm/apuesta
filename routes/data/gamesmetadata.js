var metadata = {
	// Week 1
	1 : { date: new Date('September 5, 2013, 13:00:00'), score: { away: 27, home: 49 }, spread: 9.5 },
	2 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 23, home: 21 }, spread: -10.5 },
	3 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 16, home: 09 }, spread: 3 },
	4 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 17, home: 23 }, spread: 5.5 },
	5 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 17, home: 18 }, spread: 10.5 },
	6 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 28, home: 2 }, spread: 7 },
	7 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 12, home: 7 }, spread: -4 },
	8 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 21, home: 24 }, spread: -4 },
	9 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 23, home: 10 }, spread: 3 },
	10 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 24, home: 34 }, spread: -3.5 },
	11 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 17, home: 21 }, spread: 1.5 },
	12 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 28, home: 34 }, spread: 4.5 },
	13 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 24, home: 27 }, spread: 4.5 },
	14 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 31, home: 36 }, spread: 3.5 },
	15 : { date: new Date('September 8, 2013, 13:00:00'), score: { away: 33, home: 27 }, spread: 3.5 },
	16 : { date: new Date('September 9, 2013, 13:00:00'), score: { away: 31, home: 28 }, spread: -4.5 },

	// Week 2
	17 : { date: new Date('September 12, 2013, 13:00:00'), score: { away: 10, home: 13 }, spread: 12.5 },
	18 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 24, home: 31 }, spread: 7 },
	19 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 33, home: 30 }, spread: 8.5 },
	20 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 16, home: 17 }, spread: 2.5 },
	21 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 24, home: 20 }, spread: 3 },
	22 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 24, home: 30 }, spread: 9.5 },
	23 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 20, home: 38 }, spread: 7.5 },
	24 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 6, home: 14 }, spread: 6.5 },
	25 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 23, home: 24 }, spread: -2.5 },
	26 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 30, home: 31 }, spread: 6.5 },
	27 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 16, home: 14 }, spread: -4.5 },
	28 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 21, home: 25 }, spread: -2.5 },
	29 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 9, home: 19 }, spread: 6.5 },
	30 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 41, home: 23 }, spread: -5 },
	31 : { date: new Date('September 15, 2013, 13:00:00'), score: { away: 3, home: 29 }, spread: 2.5 },
	32 : { date: new Date('September 16, 2013, 13:00:00'), score: { away: 10, home: 20 }, spread: -6.5 },

	// Week 3
	33 : { date: new Date('September 19, 2013, 13:00:00'), score: { away: 26, home: 16 }, spread: 3 },
	34 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 9, home: 30 }, spread: -2.5 },
	35 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 0, home: 38 }, spread: -1.5 },
	36 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 27, home: 20 }, spread: 1.5 },
	37 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 17, home: 20 }, spread: 2.5 },
	38 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 7, home: 31 }, spread: 8.5 },
	39 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 3, home: 23 }, spread: 7.5 },
	40 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 30, home: 34 }, spread: -3 },
	41 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 7, home: 31 }, spread: 4 },
	42 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 31, home: 27 }, spread: 5.5 },
	43 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 23, home: 27 }, spread: -0.5 },
	44 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 20, home: 27 }, spread: 1.5 },
	45 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 27, home: 7 }, spread: 10.5 },
	46 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 17, home: 45 }, spread: 19.5 },
	47 : { date: new Date('September 22, 2013, 13:00:00'), score: { away: 40, home: 23 }, spread: -2.5 },
	48 : { date: new Date('September 23, 2013, 13:00:00'), score: { away: 21, home: 37 }, spread: 15.5 },

	// Week 4
	49 : { date: new Date('September 26, 2013, 13:00:00'), score: { away: 35, home: 11 }, spread: -3.5 },
	50 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 20, home: 23 }, spread: -3.5 },
	51 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 13, home: 10 }, spread: 1.5 },
	52 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 27, home: 34 }, spread: -3 },
	53 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 7, home: 31 }, spread: 4.5 },
	54 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 37, home: 3 }, spread: -9.5 },
	55 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 23, home: 20 }, spread: -3 },
	56 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 6, home: 17 }, spread: -4.5 },
	57 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 32, home: 40 }, spread: 2.5 },
	58 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 13, home: 38 }, spread: 3.5 },
	59 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 24, home: 14 }, spread: -3 },
	60 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 20, home: 52 }, spread: 11.5 },
	61 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 21, home: 30 }, spread: -2.5 },
	62 : { date: new Date('September 29, 2013, 13:00:00'), score: { away: 30, home: 23 }, spread: 1.5 },
	63 : { date: new Date('September 30, 2013, 13:00:00'), score: { away: 17, home: 38 }, spread: 6.5 },

	// Week 5
	64 : { date: new Date('October 3, 2013, 20:25:00'), score: { away: 24, home: 37 }, spread: 4 },
	65 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 6, home: 13 }, spread: 1 },
	66 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 9, home: 22 }, spread: 7 },
	67 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 28, home: 34 }, spread: -1.5 },
	68 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 26, home: 23 }, spread: 3 },
	69 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 26, home: 18 }, spread: -1 },
	70 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 36, home: 21 }, spread: 1 },
	71 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 26, home: 17 }, spread: -2.5 },
	72 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 20, home: 34 }, spread: 11.5 },
	73 : { date: new Date('October 6, 2013, 13:00:00'), score: { away: 6, home: 22 }, spread: -1.5 },
	74 : { date: new Date('October 6, 2013, 16:05:00'), score: { away: 51, home: 48 }, spread: -8 },
	76 : { date: new Date('October 6, 2013, 16:25:00'), score: { away: 3, home: 34 }, spread: 7},
	75 : { date: new Date('October 6, 2013, 23:35:00'), score: { away: 17, home: 27 }, spread: -4.5 },
	77 : { date: new Date('October 7, 2013, 20:40:00'), score: { away: 30, home: 28 }, spread: 9.5 },

	// Week 6
	78 : { date: new Date('October 10, 2013, 20:25:00') },
	79 : { date: new Date('October 13, 2013, 13:00:00') },
	80 : { date: new Date('October 13, 2013, 13:00:00') },
	81 : { date: new Date('October 13, 2013, 13:00:00') },
	82 : { date: new Date('October 13, 2013, 13:00:00') },
	83 : { date: new Date('October 13, 2013, 13:00:00') },
	84 : { date: new Date('October 13, 2013, 13:00:00') },
	85 : { date: new Date('October 13, 2013, 13:00:00') },
	86 : { date: new Date('October 13, 2013, 13:00:00') },
	87 : { date: new Date('October 13, 2013, 16:05:00') },
	88 : { date: new Date('October 13, 2013, 16:05:00') },
	89 : { date: new Date('October 13, 2013, 16:25:00') },
	90 : { date: new Date('October 13, 2013, 16:25:00') },
	91 : { date: new Date('October 13, 2013, 20:30:00') },
	92 : { date: new Date('October 14, 2013, 20:40:00') },

	// Week 7
	93 : { date: new Date('October 17, 2013, 20:25:00') },
	94 : { date: new Date('October 20, 2013, 13:00:00') },
	95 : { date: new Date('October 20, 2013, 13:00:00') },
	96 : { date: new Date('October 20, 2013, 13:00:00') },
	97 : { date: new Date('October 20, 2013, 13:00:00') },
	98 : { date: new Date('October 20, 2013, 13:00:00') },
	99 : { date: new Date('October 20, 2013, 13:00:00') },
	100 : { date: new Date('October 20, 2013, 13:00:00') },
	101 : { date: new Date('October 20, 2013, 13:00:00') },
	102 : { date: new Date('October 20, 2013, 16:05:00') },
	103 : { date: new Date('October 20, 2013, 16:25:00') },
	104 : { date: new Date('October 20, 2013, 16:25:00') },
	105 : { date: new Date('October 20, 2013, 16:25:00') },
	106 : { date: new Date('October 20, 2013, 20:30:00') },
	107 : { date: new Date('October 21, 2013, 20:40:00') },

	// Week 8
	108 : { date: new Date('October 24, 2013, 20:25:00') },
	109 : { date: new Date('October 27, 2013, 13:00:00') },
	110 : { date: new Date('October 27, 2013, 13:00:00') },
	111 : { date: new Date('October 27, 2013, 13:00:00') },
	112 : { date: new Date('October 27, 2013, 13:00:00') },
	113 : { date: new Date('October 27, 2013, 13:00:00') },
	114 : { date: new Date('October 27, 2013, 13:00:00') },
	115 : { date: new Date('October 27, 2013, 16:05:00') },
	116 : { date: new Date('October 27, 2013, 16:05:00') },
	117 : { date: new Date('October 27, 2013, 16:25:00') },
	118 : { date: new Date('October 27, 2013, 16:25:00') },
	119 : { date: new Date('October 27, 2013, 20:30:00') },
	120 : { date: new Date('October 28, 2013, 20:40:00') },

	// Week 9
	121 : { date: new Date('October 31, 2013, 20:25:00') },
	122 : { date: new Date('November 3, 2013, 13:00:00') },
	123 : { date: new Date('November 3, 2013, 13:00:00') },
	124 : { date: new Date('November 3, 2013, 13:00:00') },
	125 : { date: new Date('November 3, 2013, 13:00:00') },
	126 : { date: new Date('November 3, 2013, 13:00:00') },
	127 : { date: new Date('November 3, 2013, 13:00:00') },
	128 : { date: new Date('November 3, 2013, 16:05:00') },
	129 : { date: new Date('November 3, 2013, 16:05:00') },
	130 : { date: new Date('November 3, 2013, 16:25:00') },
	131 : { date: new Date('November 3, 2013, 16:25:00') },
	132 : { date: new Date('November 3, 2013, 20:30:00') },
	133 : { date: new Date('November 4, 2013, 20:40:00') },

	// Week 10
	134 : { date: new Date('November 7, 2013, 20:25:00') },
	135 : { date: new Date('November 10, 2013, 13:00:00') },
	136 : { date: new Date('November 10, 2013, 13:00:00') },
	137 : { date: new Date('November 10, 2013, 13:00:00') },
	138 : { date: new Date('November 10, 2013, 13:00:00') },
	139 : { date: new Date('November 10, 2013, 13:00:00') },
	140 : { date: new Date('November 10, 2013, 13:00:00') },
	141 : { date: new Date('November 10, 2013, 13:00:00') },
	142 : { date: new Date('November 10, 2013, 13:00:00') },
	143 : { date: new Date('November 10, 2013, 16:05:00') },
	144 : { date: new Date('November 10, 2013, 16:25:00') },
	145 : { date: new Date('November 10, 2013, 16:25:00') },
	146 : { date: new Date('November 10, 2013, 20:30:00') },
	147 : { date: new Date('November 11, 2013, 20:40:00') },

	// Week 11
	148 : { date: new Date('November 14, 2013, 20:25:00') },
	149 : { date: new Date('November 17, 2013, 13:00:00') },
	150 : { date: new Date('November 17, 2013, 13:00:00') },
	151 : { date: new Date('November 17, 2013, 13:00:00') },
	152 : { date: new Date('November 17, 2013, 13:00:00') },
	153 : { date: new Date('November 17, 2013, 13:00:00') },
	154 : { date: new Date('November 17, 2013, 13:00:00') },
	155 : { date: new Date('November 17, 2013, 13:00:00') },
	156 : { date: new Date('November 17, 2013, 13:00:00') },
	157 : { date: new Date('November 17, 2013, 13:00:00') },
	158 : { date: new Date('November 17, 2013, 16:05:00') },
	159 : { date: new Date('November 17, 2013, 16:25:00') },
	160 : { date: new Date('November 17, 2013, 16:25:00') },
	161 : { date: new Date('November 17, 2013, 20:30:00') },
	162 : { date: new Date('November 18, 2013, 20:40:00') },

	// Week 12
	163 : { date: new Date('November 21, 2013, 20:25:00') },
	164 : { date: new Date('November 24, 2013, 13:00:00') },
	165 : { date: new Date('November 24, 2013, 13:00:00') },
	167 : { date: new Date('November 24, 2013, 13:00:00') },
	168 : { date: new Date('November 24, 2013, 13:00:00') },
	169 : { date: new Date('November 24, 2013, 13:00:00') },
	170 : { date: new Date('November 24, 2013, 13:00:00') },
	171 : { date: new Date('November 24, 2013, 13:00:00') },
	172 : { date: new Date('November 24, 2013, 13:00:00') },
	173 : { date: new Date('November 24, 2013, 16:05:00') },
	174 : { date: new Date('November 24, 2013, 16:05:00') },
	175 : { date: new Date('November 24, 2013, 16:25:00') },
	176 : { date: new Date('November 25, 2013, 20:40:00') },

	// Week 13
	177 : { date: new Date('November 28, 2013, 12:30:00') },
	178 : { date: new Date('November 28, 2013, 16:30:00') },
	179 : { date: new Date('November 28, 2013, 20:30:00') },
	180 : { date: new Date('December 1, 2013, 13:00:00') },
	181 : { date: new Date('December 1, 2013, 13:00:00') },
	182 : { date: new Date('December 1, 2013, 13:00:00') },
	183 : { date: new Date('December 1, 2013, 13:00:00') },
	184 : { date: new Date('December 1, 2013, 13:00:00') },
	185 : { date: new Date('December 1, 2013, 13:00:00') },
	186 : { date: new Date('December 1, 2013, 13:00:00') },
	187 : { date: new Date('December 1, 2013, 16:05:00') },
	188 : { date: new Date('December 1, 2013, 16:05:00') },
	189 : { date: new Date('December 1, 2013, 16:25:00') },
	190 : { date: new Date('December 1, 2013, 16:25:00') },
	191 : { date: new Date('December 1, 2013, 20:30:00') },
	192 : { date: new Date('December 2, 2013, 20:40:00') },

	// Week 14
	193 : { date: new Date('December 5, 2013, 20:25:00') },
	194 : { date: new Date('December 8, 2013, 13:00:00') },
	195 : { date: new Date('December 8, 2013, 13:00:00') },
	196 : { date: new Date('December 8, 2013, 13:00:00') },
	197 : { date: new Date('December 8, 2013, 13:00:00') },
	198 : { date: new Date('December 8, 2013, 13:00:00') },
	199 : { date: new Date('December 8, 2013, 13:00:00') },
	200 : { date: new Date('December 8, 2013, 13:00:00') },
	201 : { date: new Date('December 8, 2013, 13:00:00') },
	202 : { date: new Date('December 8, 2013, 13:00:00') },
	203 : { date: new Date('December 8, 2013, 13:00:00') },
	204 : { date: new Date('December 8, 2013, 16:05:00') },
	205 : { date: new Date('December 8, 2013, 16:25:00') },
	206 : { date: new Date('December 8, 2013, 16:25:00') },
	207 : { date: new Date('December 8, 2013, 16:25:00') },
	208 : { date: new Date('December 9, 2013, 20:40:00') },

	// Week 15
	209 : { date: new Date('December 12, 2013, 20:25:00') },
	210 : { date: new Date('December 15, 2013, 13:00:00') },
	211 : { date: new Date('December 15, 2013, 13:00:00') },
	212 : { date: new Date('December 15, 2013, 13:00:00') },
	213 : { date: new Date('December 15, 2013, 13:00:00') },
	214 : { date: new Date('December 15, 2013, 13:00:00') },
	215 : { date: new Date('December 15, 2013, 13:00:00') },
	216 : { date: new Date('December 15, 2013, 13:00:00') },
	217 : { date: new Date('December 15, 2013, 13:00:00') },
	218 : { date: new Date('December 15, 2013, 13:00:00') },
	219 : { date: new Date('December 15, 2013, 13:00:00') },
	220 : { date: new Date('December 15, 2013, 16:05:00') },
	221 : { date: new Date('December 15, 2013, 16:05:00') },
	222 : { date: new Date('December 15, 2013, 16:25:00') },
	223 : { date: new Date('December 15, 2013, 20:30:00') },
	224 : { date: new Date('December 16, 2013, 20:40:00') },

	// Week 16
	225 : { date: new Date('December 22, 2013, 13:00:00') },
	226 : { date: new Date('December 22, 2013, 13:00:00') },
	227 : { date: new Date('December 22, 2013, 13:00:00') },
	228 : { date: new Date('December 22, 2013, 13:00:00') },
	229 : { date: new Date('December 22, 2013, 13:00:00') },
	230 : { date: new Date('December 22, 2013, 13:00:00') },
	222 : { date: new Date('December 22, 2013, 13:00:00') },
	232 : { date: new Date('December 22, 2013, 13:00:00') },
	233 : { date: new Date('December 22, 2013, 13:00:00') },
	234 : { date: new Date('December 22, 2013, 13:00:00') },
	235 : { date: new Date('December 22, 2013, 16:05:00') },
	236 : { date: new Date('December 22, 2013, 16:05:00') },
	237 : { date: new Date('December 22, 2013, 16:25:00') },
	238 : { date: new Date('December 22, 2013, 16:25:00') },
	239 : { date: new Date('December 22, 2013, 20:30:00') },
	240 : { date: new Date('December 22, 2013, 20:40:00') },

	// Week 17
	241 : { date: new Date('December 29, 2013, 13:00:00') },
	242 : { date: new Date('December 29, 2013, 13:00:00') },
	243 : { date: new Date('December 29, 2013, 13:00:00') },
	244 : { date: new Date('December 29, 2013, 13:00:00') },
	245 : { date: new Date('December 29, 2013, 13:00:00') },
	246 : { date: new Date('December 29, 2013, 13:00:00') },
	247 : { date: new Date('December 29, 2013, 13:00:00') },
	248 : { date: new Date('December 29, 2013, 13:00:00') },
	249 : { date: new Date('December 29, 2013, 13:00:00') },
	250 : { date: new Date('December 29, 2013, 13:00:00') },
	251 : { date: new Date('December 29, 2013, 13:00:00') },
	252 : { date: new Date('December 29, 2013, 13:00:00') },
	253 : { date: new Date('December 29, 2013, 16:25:00') },
	254 : { date: new Date('December 29, 2013, 16:25:00') },
	255 : { date: new Date('December 29, 2013, 16:25:00') },
	256 : { date: new Date('December 29, 2013, 16:25:00') },

	// week 18
	257 : { date: new Date('January 3, 2014, 16:25:00') },
	258 : { date: new Date('January 3, 2014, 16:25:00') },
	259 : { date: new Date('January 3, 2014, 16:25:00') },
	260 : { date: new Date('January 3, 2014, 16:25:00') },

	// week 19
	261 : { date: new Date('January 11, 2014, 16:35:00') },
	262 : { date: new Date('January 11, 2014, 20:15:00') },
	263 : { date: new Date('January 12, 2014, 13:05:00') },
	264 : { date: new Date('January 12, 2014, 16:40:00') }
};

exports.metadata = metadata;
exports.getMetadataByGame = function( id ) {
	// TODO: Can go through database now
	return metadata[id];
}
