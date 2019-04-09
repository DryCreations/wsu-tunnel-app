const len0 = [
  { nodeIDs: [1], edgeIDs: [] },
  { nodeIDs: [2], edgeIDs: [] },
  { nodeIDs: [3], edgeIDs: [] },
  { nodeIDs: [4], edgeIDs: [] },
  { nodeIDs: [5], edgeIDs: [] },
  { nodeIDs: [6], edgeIDs: [] },
  { nodeIDs: [7], edgeIDs: [] },
  { nodeIDs: [8], edgeIDs: [] },
  { nodeIDs: [9], edgeIDs: [] },
  { nodeIDs: [10], edgeIDs: [] },
  { nodeIDs: [11], edgeIDs: [] },
  { nodeIDs: [12], edgeIDs: [] },
  { nodeIDs: [13], edgeIDs: [] },
  { nodeIDs: [14], edgeIDs: [] },
  { nodeIDs: [15], edgeIDs: [] },
  { nodeIDs: [16], edgeIDs: [] },
  { nodeIDs: [17], edgeIDs: [] },
  { nodeIDs: [18], edgeIDs: [] },
  { nodeIDs: [19], edgeIDs: [] },
  { nodeIDs: [20], edgeIDs: [] }
];

const len1 = [
  { nodeIDs: [1, 2], edgeIDs: [1] },
  { nodeIDs: [2, 1], edgeIDs: [1] },
  { nodeIDs: [2, 3], edgeIDs: [2] },
  { nodeIDs: [3, 2], edgeIDs: [2] },
  { nodeIDs: [3, 4], edgeIDs: [3] },
  { nodeIDs: [3, 5], edgeIDs: [4] },
  { nodeIDs: [4, 3], edgeIDs: [3] },
  { nodeIDs: [4, 5], edgeIDs: [5] },
  { nodeIDs: [5, 3], edgeIDs: [4] },
  { nodeIDs: [5, 4], edgeIDs: [5] },
  { nodeIDs: [5, 6], edgeIDs: [6] },
  { nodeIDs: [6, 5], edgeIDs: [6] },
  { nodeIDs: [6, 7], edgeIDs: [7] },
  { nodeIDs: [7, 6], edgeIDs: [7] },
  { nodeIDs: [7, 8], edgeIDs: [8] },
  { nodeIDs: [7, 9], edgeIDs: [9] },
  { nodeIDs: [8, 7], edgeIDs: [8] },
  { nodeIDs: [9, 7], edgeIDs: [9] },
  { nodeIDs: [9, 10], edgeIDs: [10] },
  { nodeIDs: [10, 9], edgeIDs: [10] },
  { nodeIDs: [10, 11], edgeIDs: [11] },
  { nodeIDs: [10, 12], edgeIDs: [12] },
  { nodeIDs: [11, 10], edgeIDs: [11] },
  { nodeIDs: [11, 12], edgeIDs: [13] },
  { nodeIDs: [12, 10], edgeIDs: [12] },
  { nodeIDs: [12, 11], edgeIDs: [13] },
  { nodeIDs: [12, 13], edgeIDs: [14] },
  { nodeIDs: [12, 14], edgeIDs: [15] },
  { nodeIDs: [12, 15], edgeIDs: [16] },
  { nodeIDs: [12, 16], edgeIDs: [17] },
  { nodeIDs: [12, 17], edgeIDs: [18] },
  { nodeIDs: [12, 18], edgeIDs: [19] },
  { nodeIDs: [13, 12], edgeIDs: [14] },
  { nodeIDs: [14, 12], edgeIDs: [15] },
  { nodeIDs: [15, 12], edgeIDs: [16] },
  { nodeIDs: [16, 12], edgeIDs: [17] },
  { nodeIDs: [17, 12], edgeIDs: [18] },
  { nodeIDs: [17, 18], edgeIDs: [20] },
  { nodeIDs: [17, 19], edgeIDs: [21] },
  { nodeIDs: [18, 12], edgeIDs: [19] },
  { nodeIDs: [18, 17], edgeIDs: [20] },
  { nodeIDs: [18, 19], edgeIDs: [22] },
  { nodeIDs: [19, 17], edgeIDs: [21] },
  { nodeIDs: [19, 18], edgeIDs: [22] },
  { nodeIDs: [19, 20], edgeIDs: [23] },
  { nodeIDs: [20, 19], edgeIDs: [23] }
];

const len2 = [
  { nodeIDs: [1, 2, 3], edgeIDs: [1, 2] },
  { nodeIDs: [2, 3, 4], edgeIDs: [2, 3] },
  { nodeIDs: [2, 3, 5], edgeIDs: [2, 4] },
  { nodeIDs: [3, 2, 1], edgeIDs: [2, 1] },
  { nodeIDs: [3, 5, 6], edgeIDs: [4, 6] },
  { nodeIDs: [4, 3, 2], edgeIDs: [3, 2] },
  { nodeIDs: [4, 5, 6], edgeIDs: [5, 6] },
  { nodeIDs: [5, 3, 2], edgeIDs: [4, 2] },
  { nodeIDs: [5, 6, 7], edgeIDs: [6, 7] },
  { nodeIDs: [6, 5, 3], edgeIDs: [6, 4] },
  { nodeIDs: [6, 5, 4], edgeIDs: [6, 5] },
  { nodeIDs: [6, 7, 8], edgeIDs: [7, 8] },
  { nodeIDs: [6, 7, 9], edgeIDs: [7, 9] },
  { nodeIDs: [7, 6, 5], edgeIDs: [7, 6] },
  { nodeIDs: [7, 9, 10], edgeIDs: [9, 10] },
  { nodeIDs: [8, 7, 6], edgeIDs: [8, 7] },
  { nodeIDs: [8, 7, 9], edgeIDs: [8, 9] },
  { nodeIDs: [9, 7, 6], edgeIDs: [9, 7] },
  { nodeIDs: [9, 7, 8], edgeIDs: [9, 8] },
  { nodeIDs: [9, 10, 11], edgeIDs: [10, 11] },
  { nodeIDs: [9, 10, 12], edgeIDs: [10, 12] },
  { nodeIDs: [10, 9, 7], edgeIDs: [10, 9] },
  { nodeIDs: [10, 12, 13], edgeIDs: [12, 14] },
  { nodeIDs: [10, 12, 14], edgeIDs: [12, 15] },
  { nodeIDs: [10, 12, 15], edgeIDs: [12, 16] },
  { nodeIDs: [10, 12, 16], edgeIDs: [12, 17] },
  { nodeIDs: [10, 12, 17], edgeIDs: [12, 18] },
  { nodeIDs: [10, 12, 18], edgeIDs: [12, 19] },
  { nodeIDs: [11, 10, 9], edgeIDs: [11, 10] },
  { nodeIDs: [11, 12, 13], edgeIDs: [13, 14] },
  { nodeIDs: [11, 12, 14], edgeIDs: [13, 15] },
  { nodeIDs: [11, 12, 15], edgeIDs: [13, 16] },
  { nodeIDs: [11, 12, 16], edgeIDs: [13, 17] },
  { nodeIDs: [11, 12, 17], edgeIDs: [13, 18] },
  { nodeIDs: [11, 12, 18], edgeIDs: [13, 19] },
  { nodeIDs: [12, 10, 9], edgeIDs: [12, 10] },
  { nodeIDs: [12, 17, 19], edgeIDs: [18, 21] },
  { nodeIDs: [13, 12, 10], edgeIDs: [14, 12] },
  { nodeIDs: [13, 12, 11], edgeIDs: [14, 13] },
  { nodeIDs: [13, 12, 14], edgeIDs: [14, 15] },
  { nodeIDs: [13, 12, 15], edgeIDs: [14, 16] },
  { nodeIDs: [13, 12, 16], edgeIDs: [14, 17] },
  { nodeIDs: [13, 12, 17], edgeIDs: [14, 18] },
  { nodeIDs: [13, 12, 18], edgeIDs: [14, 19] },
  { nodeIDs: [14, 12, 10], edgeIDs: [15, 12] },
  { nodeIDs: [14, 12, 11], edgeIDs: [15, 13] },
  { nodeIDs: [14, 12, 13], edgeIDs: [15, 14] },
  { nodeIDs: [14, 12, 15], edgeIDs: [15, 16] },
  { nodeIDs: [14, 12, 16], edgeIDs: [15, 17] },
  { nodeIDs: [14, 12, 17], edgeIDs: [15, 18] },
  { nodeIDs: [14, 12, 18], edgeIDs: [15, 19] },
  { nodeIDs: [15, 12, 10], edgeIDs: [16, 12] },
  { nodeIDs: [15, 12, 11], edgeIDs: [16, 13] },
  { nodeIDs: [15, 12, 13], edgeIDs: [16, 14] },
  { nodeIDs: [15, 12, 14], edgeIDs: [16, 15] },
  { nodeIDs: [15, 12, 16], edgeIDs: [16, 17] },
  { nodeIDs: [15, 12, 17], edgeIDs: [16, 18] },
  { nodeIDs: [15, 12, 18], edgeIDs: [16, 19] },
  { nodeIDs: [16, 12, 10], edgeIDs: [17, 12] },
  { nodeIDs: [16, 12, 11], edgeIDs: [17, 13] },
  { nodeIDs: [16, 12, 13], edgeIDs: [17, 14] },
  { nodeIDs: [16, 12, 14], edgeIDs: [17, 15] },
  { nodeIDs: [16, 12, 15], edgeIDs: [17, 16] },
  { nodeIDs: [16, 12, 17], edgeIDs: [17, 18] },
  { nodeIDs: [16, 12, 18], edgeIDs: [17, 19] },
  { nodeIDs: [17, 12, 10], edgeIDs: [18, 12] },
  { nodeIDs: [17, 12, 11], edgeIDs: [18, 13] },
  { nodeIDs: [17, 12, 13], edgeIDs: [18, 14] },
  { nodeIDs: [17, 12, 14], edgeIDs: [18, 15] },
  { nodeIDs: [17, 12, 15], edgeIDs: [18, 16] },
  { nodeIDs: [17, 12, 16], edgeIDs: [18, 17] },
  { nodeIDs: [17, 19, 20], edgeIDs: [21, 23] },
  { nodeIDs: [18, 12, 10], edgeIDs: [19, 12] },
  { nodeIDs: [18, 12, 11], edgeIDs: [19, 13] },
  { nodeIDs: [18, 12, 13], edgeIDs: [19, 14] },
  { nodeIDs: [18, 12, 14], edgeIDs: [19, 15] },
  { nodeIDs: [18, 12, 15], edgeIDs: [19, 16] },
  { nodeIDs: [18, 12, 16], edgeIDs: [19, 17] },
  { nodeIDs: [18, 19, 20], edgeIDs: [22, 23] },
  { nodeIDs: [19, 17, 12], edgeIDs: [21, 18] },
  { nodeIDs: [20, 19, 17], edgeIDs: [23, 21] },
  { nodeIDs: [20, 19, 18], edgeIDs: [23, 22] }
];

const len3 = [
  { nodeIDs: [1, 2, 3, 4], edgeIDs: [1, 2, 3] },
  { nodeIDs: [1, 2, 3, 5], edgeIDs: [1, 2, 4] },
  { nodeIDs: [2, 3, 5, 6], edgeIDs: [2, 4, 6] },
  { nodeIDs: [3, 5, 6, 7], edgeIDs: [4, 6, 7] },
  { nodeIDs: [4, 3, 2, 1], edgeIDs: [3, 2, 1] },
  { nodeIDs: [4, 5, 6, 7], edgeIDs: [5, 6, 7] },
  { nodeIDs: [5, 3, 2, 1], edgeIDs: [4, 2, 1] },
  { nodeIDs: [5, 6, 7, 8], edgeIDs: [6, 7, 8] },
  { nodeIDs: [5, 6, 7, 9], edgeIDs: [6, 7, 9] },
  { nodeIDs: [6, 5, 3, 2], edgeIDs: [6, 4, 2] },
  { nodeIDs: [6, 7, 9, 10], edgeIDs: [7, 9, 10] },
  { nodeIDs: [7, 6, 5, 3], edgeIDs: [7, 6, 4] },
  { nodeIDs: [7, 6, 5, 4], edgeIDs: [7, 6, 5] },
  { nodeIDs: [7, 9, 10, 11], edgeIDs: [9, 10, 11] },
  { nodeIDs: [7, 9, 10, 12], edgeIDs: [9, 10, 12] },
  { nodeIDs: [8, 7, 6, 5], edgeIDs: [8, 7, 6] },
  { nodeIDs: [8, 7, 9, 10], edgeIDs: [8, 9, 10] },
  { nodeIDs: [9, 7, 6, 5], edgeIDs: [9, 7, 6] },
  { nodeIDs: [9, 10, 12, 13], edgeIDs: [10, 12, 14] },
  { nodeIDs: [9, 10, 12, 14], edgeIDs: [10, 12, 15] },
  { nodeIDs: [9, 10, 12, 15], edgeIDs: [10, 12, 16] },
  { nodeIDs: [9, 10, 12, 16], edgeIDs: [10, 12, 17] },
  { nodeIDs: [9, 10, 12, 17], edgeIDs: [10, 12, 18] },
  { nodeIDs: [9, 10, 12, 18], edgeIDs: [10, 12, 19] },
  { nodeIDs: [10, 9, 7, 6], edgeIDs: [10, 9, 7] },
  { nodeIDs: [10, 9, 7, 8], edgeIDs: [10, 9, 8] },
  { nodeIDs: [10, 12, 17, 19], edgeIDs: [12, 18, 21] },
  { nodeIDs: [11, 10, 9, 7], edgeIDs: [11, 10, 9] },
  { nodeIDs: [11, 12, 17, 19], edgeIDs: [13, 18, 21] },
  { nodeIDs: [12, 10, 9, 7], edgeIDs: [12, 10, 9] },
  { nodeIDs: [12, 17, 19, 20], edgeIDs: [18, 21, 23] },
  { nodeIDs: [13, 12, 10, 9], edgeIDs: [14, 12, 10] },
  { nodeIDs: [13, 12, 17, 19], edgeIDs: [14, 18, 21] },
  { nodeIDs: [14, 12, 10, 9], edgeIDs: [15, 12, 10] },
  { nodeIDs: [14, 12, 17, 19], edgeIDs: [15, 18, 21] },
  { nodeIDs: [15, 12, 10, 9], edgeIDs: [16, 12, 10] },
  { nodeIDs: [15, 12, 17, 19], edgeIDs: [16, 18, 21] },
  { nodeIDs: [16, 12, 10, 9], edgeIDs: [17, 12, 10] },
  { nodeIDs: [16, 12, 17, 19], edgeIDs: [17, 18, 21] },
  { nodeIDs: [17, 12, 10, 9], edgeIDs: [18, 12, 10] },
  { nodeIDs: [18, 12, 10, 9], edgeIDs: [19, 12, 10] },
  { nodeIDs: [19, 17, 12, 10], edgeIDs: [21, 18, 12] },
  { nodeIDs: [19, 17, 12, 11], edgeIDs: [21, 18, 13] },
  { nodeIDs: [19, 17, 12, 13], edgeIDs: [21, 18, 14] },
  { nodeIDs: [19, 17, 12, 14], edgeIDs: [21, 18, 15] },
  { nodeIDs: [19, 17, 12, 15], edgeIDs: [21, 18, 16] },
  { nodeIDs: [19, 17, 12, 16], edgeIDs: [21, 18, 17] },
  { nodeIDs: [20, 19, 17, 12], edgeIDs: [23, 21, 18] }
];

const len4 = [
  { nodeIDs: [1, 2, 3, 5, 6], edgeIDs: [1, 2, 4, 6] },
  { nodeIDs: [2, 3, 5, 6, 7], edgeIDs: [2, 4, 6, 7] },
  { nodeIDs: [3, 5, 6, 7, 8], edgeIDs: [4, 6, 7, 8] },
  { nodeIDs: [3, 5, 6, 7, 9], edgeIDs: [4, 6, 7, 9] },
  { nodeIDs: [4, 5, 6, 7, 8], edgeIDs: [5, 6, 7, 8] },
  { nodeIDs: [4, 5, 6, 7, 9], edgeIDs: [5, 6, 7, 9] },
  { nodeIDs: [5, 6, 7, 9, 10], edgeIDs: [6, 7, 9, 10] },
  { nodeIDs: [6, 5, 3, 2, 1], edgeIDs: [6, 4, 2, 1] },
  { nodeIDs: [6, 7, 9, 10, 11], edgeIDs: [7, 9, 10, 11] },
  { nodeIDs: [6, 7, 9, 10, 12], edgeIDs: [7, 9, 10, 12] },
  { nodeIDs: [7, 6, 5, 3, 2], edgeIDs: [7, 6, 4, 2] },
  { nodeIDs: [7, 9, 10, 12, 13], edgeIDs: [9, 10, 12, 14] },
  { nodeIDs: [7, 9, 10, 12, 14], edgeIDs: [9, 10, 12, 15] },
  { nodeIDs: [7, 9, 10, 12, 15], edgeIDs: [9, 10, 12, 16] },
  { nodeIDs: [7, 9, 10, 12, 16], edgeIDs: [9, 10, 12, 17] },
  { nodeIDs: [7, 9, 10, 12, 17], edgeIDs: [9, 10, 12, 18] },
  { nodeIDs: [7, 9, 10, 12, 18], edgeIDs: [9, 10, 12, 19] },
  { nodeIDs: [8, 7, 6, 5, 3], edgeIDs: [8, 7, 6, 4] },
  { nodeIDs: [8, 7, 6, 5, 4], edgeIDs: [8, 7, 6, 5] },
  { nodeIDs: [8, 7, 9, 10, 11], edgeIDs: [8, 9, 10, 11] },
  { nodeIDs: [8, 7, 9, 10, 12], edgeIDs: [8, 9, 10, 12] },
  { nodeIDs: [9, 7, 6, 5, 3], edgeIDs: [9, 7, 6, 4] },
  { nodeIDs: [9, 7, 6, 5, 4], edgeIDs: [9, 7, 6, 5] },
  { nodeIDs: [9, 10, 12, 17, 19], edgeIDs: [10, 12, 18, 21] },
  { nodeIDs: [10, 9, 7, 6, 5], edgeIDs: [10, 9, 7, 6] },
  { nodeIDs: [10, 12, 17, 19, 20], edgeIDs: [12, 18, 21, 23] },
  { nodeIDs: [11, 10, 9, 7, 6], edgeIDs: [11, 10, 9, 7] },
  { nodeIDs: [11, 10, 9, 7, 8], edgeIDs: [11, 10, 9, 8] },
  { nodeIDs: [11, 12, 17, 19, 20], edgeIDs: [13, 18, 21, 23] },
  { nodeIDs: [12, 10, 9, 7, 6], edgeIDs: [12, 10, 9, 7] },
  { nodeIDs: [12, 10, 9, 7, 8], edgeIDs: [12, 10, 9, 8] },
  { nodeIDs: [13, 12, 10, 9, 7], edgeIDs: [14, 12, 10, 9] },
  { nodeIDs: [13, 12, 17, 19, 20], edgeIDs: [14, 18, 21, 23] },
  { nodeIDs: [14, 12, 10, 9, 7], edgeIDs: [15, 12, 10, 9] },
  { nodeIDs: [14, 12, 17, 19, 20], edgeIDs: [15, 18, 21, 23] },
  { nodeIDs: [15, 12, 10, 9, 7], edgeIDs: [16, 12, 10, 9] },
  { nodeIDs: [15, 12, 17, 19, 20], edgeIDs: [16, 18, 21, 23] },
  { nodeIDs: [16, 12, 10, 9, 7], edgeIDs: [17, 12, 10, 9] },
  { nodeIDs: [16, 12, 17, 19, 20], edgeIDs: [17, 18, 21, 23] },
  { nodeIDs: [17, 12, 10, 9, 7], edgeIDs: [18, 12, 10, 9] },
  { nodeIDs: [18, 12, 10, 9, 7], edgeIDs: [19, 12, 10, 9] },
  { nodeIDs: [19, 17, 12, 10, 9], edgeIDs: [21, 18, 12, 10] },
  { nodeIDs: [20, 19, 17, 12, 10], edgeIDs: [23, 21, 18, 12] },
  { nodeIDs: [20, 19, 17, 12, 11], edgeIDs: [23, 21, 18, 13] },
  { nodeIDs: [20, 19, 17, 12, 13], edgeIDs: [23, 21, 18, 14] },
  { nodeIDs: [20, 19, 17, 12, 14], edgeIDs: [23, 21, 18, 15] },
  { nodeIDs: [20, 19, 17, 12, 15], edgeIDs: [23, 21, 18, 16] },
  { nodeIDs: [20, 19, 17, 12, 16], edgeIDs: [23, 21, 18, 17] }
];

const len5 = [
  { nodeIDs: [1, 2, 3, 5, 6, 7], edgeIDs: [1, 2, 4, 6, 7] },
  { nodeIDs: [2, 3, 5, 6, 7, 8], edgeIDs: [2, 4, 6, 7, 8] },
  { nodeIDs: [2, 3, 5, 6, 7, 9], edgeIDs: [2, 4, 6, 7, 9] },
  { nodeIDs: [3, 5, 6, 7, 9, 10], edgeIDs: [4, 6, 7, 9, 10] },
  { nodeIDs: [4, 5, 6, 7, 9, 10], edgeIDs: [5, 6, 7, 9, 10] },
  { nodeIDs: [5, 6, 7, 9, 10, 11], edgeIDs: [6, 7, 9, 10, 11] },
  { nodeIDs: [5, 6, 7, 9, 10, 12], edgeIDs: [6, 7, 9, 10, 12] },
  { nodeIDs: [6, 7, 9, 10, 12, 13], edgeIDs: [7, 9, 10, 12, 14] },
  { nodeIDs: [6, 7, 9, 10, 12, 14], edgeIDs: [7, 9, 10, 12, 15] },
  { nodeIDs: [6, 7, 9, 10, 12, 15], edgeIDs: [7, 9, 10, 12, 16] },
  { nodeIDs: [6, 7, 9, 10, 12, 16], edgeIDs: [7, 9, 10, 12, 17] },
  { nodeIDs: [6, 7, 9, 10, 12, 17], edgeIDs: [7, 9, 10, 12, 18] },
  { nodeIDs: [6, 7, 9, 10, 12, 18], edgeIDs: [7, 9, 10, 12, 19] },
  { nodeIDs: [7, 6, 5, 3, 2, 1], edgeIDs: [7, 6, 4, 2, 1] },
  { nodeIDs: [7, 9, 10, 12, 17, 19], edgeIDs: [9, 10, 12, 18, 21] },
  { nodeIDs: [8, 7, 6, 5, 3, 2], edgeIDs: [8, 7, 6, 4, 2] },
  { nodeIDs: [8, 7, 9, 10, 12, 13], edgeIDs: [8, 9, 10, 12, 14] },
  { nodeIDs: [8, 7, 9, 10, 12, 14], edgeIDs: [8, 9, 10, 12, 15] },
  { nodeIDs: [8, 7, 9, 10, 12, 15], edgeIDs: [8, 9, 10, 12, 16] },
  { nodeIDs: [8, 7, 9, 10, 12, 16], edgeIDs: [8, 9, 10, 12, 17] },
  { nodeIDs: [8, 7, 9, 10, 12, 17], edgeIDs: [8, 9, 10, 12, 18] },
  { nodeIDs: [8, 7, 9, 10, 12, 18], edgeIDs: [8, 9, 10, 12, 19] },
  { nodeIDs: [9, 7, 6, 5, 3, 2], edgeIDs: [9, 7, 6, 4, 2] },
  { nodeIDs: [9, 10, 12, 17, 19, 20], edgeIDs: [10, 12, 18, 21, 23] },
  { nodeIDs: [10, 9, 7, 6, 5, 3], edgeIDs: [10, 9, 7, 6, 4] },
  { nodeIDs: [10, 9, 7, 6, 5, 4], edgeIDs: [10, 9, 7, 6, 5] },
  { nodeIDs: [11, 10, 9, 7, 6, 5], edgeIDs: [11, 10, 9, 7, 6] },
  { nodeIDs: [12, 10, 9, 7, 6, 5], edgeIDs: [12, 10, 9, 7, 6] },
  { nodeIDs: [13, 12, 10, 9, 7, 6], edgeIDs: [14, 12, 10, 9, 7] },
  { nodeIDs: [13, 12, 10, 9, 7, 8], edgeIDs: [14, 12, 10, 9, 8] },
  { nodeIDs: [14, 12, 10, 9, 7, 6], edgeIDs: [15, 12, 10, 9, 7] },
  { nodeIDs: [14, 12, 10, 9, 7, 8], edgeIDs: [15, 12, 10, 9, 8] },
  { nodeIDs: [15, 12, 10, 9, 7, 6], edgeIDs: [16, 12, 10, 9, 7] },
  { nodeIDs: [15, 12, 10, 9, 7, 8], edgeIDs: [16, 12, 10, 9, 8] },
  { nodeIDs: [16, 12, 10, 9, 7, 6], edgeIDs: [17, 12, 10, 9, 7] },
  { nodeIDs: [16, 12, 10, 9, 7, 8], edgeIDs: [17, 12, 10, 9, 8] },
  { nodeIDs: [17, 12, 10, 9, 7, 6], edgeIDs: [18, 12, 10, 9, 7] },
  { nodeIDs: [17, 12, 10, 9, 7, 8], edgeIDs: [18, 12, 10, 9, 8] },
  { nodeIDs: [18, 12, 10, 9, 7, 6], edgeIDs: [19, 12, 10, 9, 7] },
  { nodeIDs: [18, 12, 10, 9, 7, 8], edgeIDs: [19, 12, 10, 9, 8] },
  { nodeIDs: [19, 17, 12, 10, 9, 7], edgeIDs: [21, 18, 12, 10, 9] },
  { nodeIDs: [20, 19, 17, 12, 10, 9], edgeIDs: [23, 21, 18, 12, 10] }
];

const len6 = [
  { nodeIDs: [1, 2, 3, 5, 6, 7, 8], edgeIDs: [1, 2, 4, 6, 7, 8] },
  { nodeIDs: [1, 2, 3, 5, 6, 7, 9], edgeIDs: [1, 2, 4, 6, 7, 9] },
  { nodeIDs: [2, 3, 5, 6, 7, 9, 10], edgeIDs: [2, 4, 6, 7, 9, 10] },
  { nodeIDs: [3, 5, 6, 7, 9, 10, 11], edgeIDs: [4, 6, 7, 9, 10, 11] },
  { nodeIDs: [3, 5, 6, 7, 9, 10, 12], edgeIDs: [4, 6, 7, 9, 10, 12] },
  { nodeIDs: [4, 5, 6, 7, 9, 10, 11], edgeIDs: [5, 6, 7, 9, 10, 11] },
  { nodeIDs: [4, 5, 6, 7, 9, 10, 12], edgeIDs: [5, 6, 7, 9, 10, 12] },
  { nodeIDs: [5, 6, 7, 9, 10, 12, 13], edgeIDs: [6, 7, 9, 10, 12, 14] },
  { nodeIDs: [5, 6, 7, 9, 10, 12, 14], edgeIDs: [6, 7, 9, 10, 12, 15] },
  { nodeIDs: [5, 6, 7, 9, 10, 12, 15], edgeIDs: [6, 7, 9, 10, 12, 16] },
  { nodeIDs: [5, 6, 7, 9, 10, 12, 16], edgeIDs: [6, 7, 9, 10, 12, 17] },
  { nodeIDs: [5, 6, 7, 9, 10, 12, 17], edgeIDs: [6, 7, 9, 10, 12, 18] },
  { nodeIDs: [5, 6, 7, 9, 10, 12, 18], edgeIDs: [6, 7, 9, 10, 12, 19] },
  { nodeIDs: [6, 7, 9, 10, 12, 17, 19], edgeIDs: [7, 9, 10, 12, 18, 21] },
  { nodeIDs: [7, 9, 10, 12, 17, 19, 20], edgeIDs: [9, 10, 12, 18, 21, 23] },
  { nodeIDs: [8, 7, 6, 5, 3, 2, 1], edgeIDs: [8, 7, 6, 4, 2, 1] },
  { nodeIDs: [8, 7, 9, 10, 12, 17, 19], edgeIDs: [8, 9, 10, 12, 18, 21] },
  { nodeIDs: [9, 7, 6, 5, 3, 2, 1], edgeIDs: [9, 7, 6, 4, 2, 1] },
  { nodeIDs: [10, 9, 7, 6, 5, 3, 2], edgeIDs: [10, 9, 7, 6, 4, 2] },
  { nodeIDs: [11, 10, 9, 7, 6, 5, 3], edgeIDs: [11, 10, 9, 7, 6, 4] },
  { nodeIDs: [11, 10, 9, 7, 6, 5, 4], edgeIDs: [11, 10, 9, 7, 6, 5] },
  { nodeIDs: [12, 10, 9, 7, 6, 5, 3], edgeIDs: [12, 10, 9, 7, 6, 4] },
  { nodeIDs: [12, 10, 9, 7, 6, 5, 4], edgeIDs: [12, 10, 9, 7, 6, 5] },
  { nodeIDs: [13, 12, 10, 9, 7, 6, 5], edgeIDs: [14, 12, 10, 9, 7, 6] },
  { nodeIDs: [14, 12, 10, 9, 7, 6, 5], edgeIDs: [15, 12, 10, 9, 7, 6] },
  { nodeIDs: [15, 12, 10, 9, 7, 6, 5], edgeIDs: [16, 12, 10, 9, 7, 6] },
  { nodeIDs: [16, 12, 10, 9, 7, 6, 5], edgeIDs: [17, 12, 10, 9, 7, 6] },
  { nodeIDs: [17, 12, 10, 9, 7, 6, 5], edgeIDs: [18, 12, 10, 9, 7, 6] },
  { nodeIDs: [18, 12, 10, 9, 7, 6, 5], edgeIDs: [19, 12, 10, 9, 7, 6] },
  { nodeIDs: [19, 17, 12, 10, 9, 7, 6], edgeIDs: [21, 18, 12, 10, 9, 7] },
  { nodeIDs: [19, 17, 12, 10, 9, 7, 8], edgeIDs: [21, 18, 12, 10, 9, 8] },
  { nodeIDs: [20, 19, 17, 12, 10, 9, 7], edgeIDs: [23, 21, 18, 12, 10, 9] }
];

const len7 = [
  { nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10], edgeIDs: [1, 2, 4, 6, 7, 9, 10] },
  { nodeIDs: [2, 3, 5, 6, 7, 9, 10, 11], edgeIDs: [2, 4, 6, 7, 9, 10, 11] },
  { nodeIDs: [2, 3, 5, 6, 7, 9, 10, 12], edgeIDs: [2, 4, 6, 7, 9, 10, 12] },
  { nodeIDs: [3, 5, 6, 7, 9, 10, 12, 13], edgeIDs: [4, 6, 7, 9, 10, 12, 14] },
  { nodeIDs: [3, 5, 6, 7, 9, 10, 12, 14], edgeIDs: [4, 6, 7, 9, 10, 12, 15] },
  { nodeIDs: [3, 5, 6, 7, 9, 10, 12, 15], edgeIDs: [4, 6, 7, 9, 10, 12, 16] },
  { nodeIDs: [3, 5, 6, 7, 9, 10, 12, 16], edgeIDs: [4, 6, 7, 9, 10, 12, 17] },
  { nodeIDs: [3, 5, 6, 7, 9, 10, 12, 17], edgeIDs: [4, 6, 7, 9, 10, 12, 18] },
  { nodeIDs: [3, 5, 6, 7, 9, 10, 12, 18], edgeIDs: [4, 6, 7, 9, 10, 12, 19] },
  { nodeIDs: [4, 5, 6, 7, 9, 10, 12, 13], edgeIDs: [5, 6, 7, 9, 10, 12, 14] },
  { nodeIDs: [4, 5, 6, 7, 9, 10, 12, 14], edgeIDs: [5, 6, 7, 9, 10, 12, 15] },
  { nodeIDs: [4, 5, 6, 7, 9, 10, 12, 15], edgeIDs: [5, 6, 7, 9, 10, 12, 16] },
  { nodeIDs: [4, 5, 6, 7, 9, 10, 12, 16], edgeIDs: [5, 6, 7, 9, 10, 12, 17] },
  { nodeIDs: [4, 5, 6, 7, 9, 10, 12, 17], edgeIDs: [5, 6, 7, 9, 10, 12, 18] },
  { nodeIDs: [4, 5, 6, 7, 9, 10, 12, 18], edgeIDs: [5, 6, 7, 9, 10, 12, 19] },
  { nodeIDs: [5, 6, 7, 9, 10, 12, 17, 19], edgeIDs: [6, 7, 9, 10, 12, 18, 21] },
  {
    nodeIDs: [6, 7, 9, 10, 12, 17, 19, 20],
    edgeIDs: [7, 9, 10, 12, 18, 21, 23]
  },
  {
    nodeIDs: [8, 7, 9, 10, 12, 17, 19, 20],
    edgeIDs: [8, 9, 10, 12, 18, 21, 23]
  },
  { nodeIDs: [10, 9, 7, 6, 5, 3, 2, 1], edgeIDs: [10, 9, 7, 6, 4, 2, 1] },
  { nodeIDs: [11, 10, 9, 7, 6, 5, 3, 2], edgeIDs: [11, 10, 9, 7, 6, 4, 2] },
  { nodeIDs: [12, 10, 9, 7, 6, 5, 3, 2], edgeIDs: [12, 10, 9, 7, 6, 4, 2] },
  { nodeIDs: [13, 12, 10, 9, 7, 6, 5, 3], edgeIDs: [14, 12, 10, 9, 7, 6, 4] },
  { nodeIDs: [13, 12, 10, 9, 7, 6, 5, 4], edgeIDs: [14, 12, 10, 9, 7, 6, 5] },
  { nodeIDs: [14, 12, 10, 9, 7, 6, 5, 3], edgeIDs: [15, 12, 10, 9, 7, 6, 4] },
  { nodeIDs: [14, 12, 10, 9, 7, 6, 5, 4], edgeIDs: [15, 12, 10, 9, 7, 6, 5] },
  { nodeIDs: [15, 12, 10, 9, 7, 6, 5, 3], edgeIDs: [16, 12, 10, 9, 7, 6, 4] },
  { nodeIDs: [15, 12, 10, 9, 7, 6, 5, 4], edgeIDs: [16, 12, 10, 9, 7, 6, 5] },
  { nodeIDs: [16, 12, 10, 9, 7, 6, 5, 3], edgeIDs: [17, 12, 10, 9, 7, 6, 4] },
  { nodeIDs: [16, 12, 10, 9, 7, 6, 5, 4], edgeIDs: [17, 12, 10, 9, 7, 6, 5] },
  { nodeIDs: [17, 12, 10, 9, 7, 6, 5, 3], edgeIDs: [18, 12, 10, 9, 7, 6, 4] },
  { nodeIDs: [17, 12, 10, 9, 7, 6, 5, 4], edgeIDs: [18, 12, 10, 9, 7, 6, 5] },
  { nodeIDs: [18, 12, 10, 9, 7, 6, 5, 3], edgeIDs: [19, 12, 10, 9, 7, 6, 4] },
  { nodeIDs: [18, 12, 10, 9, 7, 6, 5, 4], edgeIDs: [19, 12, 10, 9, 7, 6, 5] },
  { nodeIDs: [19, 17, 12, 10, 9, 7, 6, 5], edgeIDs: [21, 18, 12, 10, 9, 7, 6] },
  {
    nodeIDs: [20, 19, 17, 12, 10, 9, 7, 6],
    edgeIDs: [23, 21, 18, 12, 10, 9, 7]
  },
  {
    nodeIDs: [20, 19, 17, 12, 10, 9, 7, 8],
    edgeIDs: [23, 21, 18, 12, 10, 9, 8]
  }
];

const len8 = [
  {
    nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10, 11],
    edgeIDs: [1, 2, 4, 6, 7, 9, 10, 11]
  },
  {
    nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10, 12],
    edgeIDs: [1, 2, 4, 6, 7, 9, 10, 12]
  },
  {
    nodeIDs: [2, 3, 5, 6, 7, 9, 10, 12, 13],
    edgeIDs: [2, 4, 6, 7, 9, 10, 12, 14]
  },
  {
    nodeIDs: [2, 3, 5, 6, 7, 9, 10, 12, 14],
    edgeIDs: [2, 4, 6, 7, 9, 10, 12, 15]
  },
  {
    nodeIDs: [2, 3, 5, 6, 7, 9, 10, 12, 15],
    edgeIDs: [2, 4, 6, 7, 9, 10, 12, 16]
  },
  {
    nodeIDs: [2, 3, 5, 6, 7, 9, 10, 12, 16],
    edgeIDs: [2, 4, 6, 7, 9, 10, 12, 17]
  },
  {
    nodeIDs: [2, 3, 5, 6, 7, 9, 10, 12, 17],
    edgeIDs: [2, 4, 6, 7, 9, 10, 12, 18]
  },
  {
    nodeIDs: [2, 3, 5, 6, 7, 9, 10, 12, 18],
    edgeIDs: [2, 4, 6, 7, 9, 10, 12, 19]
  },
  {
    nodeIDs: [3, 5, 6, 7, 9, 10, 12, 17, 19],
    edgeIDs: [4, 6, 7, 9, 10, 12, 18, 21]
  },
  {
    nodeIDs: [4, 5, 6, 7, 9, 10, 12, 17, 19],
    edgeIDs: [5, 6, 7, 9, 10, 12, 18, 21]
  },
  {
    nodeIDs: [5, 6, 7, 9, 10, 12, 17, 19, 20],
    edgeIDs: [6, 7, 9, 10, 12, 18, 21, 23]
  },
  {
    nodeIDs: [11, 10, 9, 7, 6, 5, 3, 2, 1],
    edgeIDs: [11, 10, 9, 7, 6, 4, 2, 1]
  },
  {
    nodeIDs: [12, 10, 9, 7, 6, 5, 3, 2, 1],
    edgeIDs: [12, 10, 9, 7, 6, 4, 2, 1]
  },
  {
    nodeIDs: [13, 12, 10, 9, 7, 6, 5, 3, 2],
    edgeIDs: [14, 12, 10, 9, 7, 6, 4, 2]
  },
  {
    nodeIDs: [14, 12, 10, 9, 7, 6, 5, 3, 2],
    edgeIDs: [15, 12, 10, 9, 7, 6, 4, 2]
  },
  {
    nodeIDs: [15, 12, 10, 9, 7, 6, 5, 3, 2],
    edgeIDs: [16, 12, 10, 9, 7, 6, 4, 2]
  },
  {
    nodeIDs: [16, 12, 10, 9, 7, 6, 5, 3, 2],
    edgeIDs: [17, 12, 10, 9, 7, 6, 4, 2]
  },
  {
    nodeIDs: [17, 12, 10, 9, 7, 6, 5, 3, 2],
    edgeIDs: [18, 12, 10, 9, 7, 6, 4, 2]
  },
  {
    nodeIDs: [18, 12, 10, 9, 7, 6, 5, 3, 2],
    edgeIDs: [19, 12, 10, 9, 7, 6, 4, 2]
  },
  {
    nodeIDs: [19, 17, 12, 10, 9, 7, 6, 5, 3],
    edgeIDs: [21, 18, 12, 10, 9, 7, 6, 4]
  },
  {
    nodeIDs: [19, 17, 12, 10, 9, 7, 6, 5, 4],
    edgeIDs: [21, 18, 12, 10, 9, 7, 6, 5]
  },
  {
    nodeIDs: [20, 19, 17, 12, 10, 9, 7, 6, 5],
    edgeIDs: [23, 21, 18, 12, 10, 9, 7, 6]
  }
];

const len9 = [
  {
    nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10, 12, 13],
    edgeIDs: [1, 2, 4, 6, 7, 9, 10, 12, 14]
  },
  {
    nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10, 12, 14],
    edgeIDs: [1, 2, 4, 6, 7, 9, 10, 12, 15]
  },
  {
    nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10, 12, 15],
    edgeIDs: [1, 2, 4, 6, 7, 9, 10, 12, 16]
  },
  {
    nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10, 12, 16],
    edgeIDs: [1, 2, 4, 6, 7, 9, 10, 12, 17]
  },
  {
    nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10, 12, 17],
    edgeIDs: [1, 2, 4, 6, 7, 9, 10, 12, 18]
  },
  {
    nodeIDs: [1, 2, 3, 5, 6, 7, 9, 10, 12, 18],
    edgeIDs: [1, 2, 4, 6, 7, 9, 10, 12, 19]
  },
  {
    nodeIDs: [2, 3, 5, 6, 7, 9, 10, 12, 17, 19],
    edgeIDs: [2, 4, 6, 7, 9, 10, 12, 18, 21]
  },
  {
    nodeIDs: [3, 5, 6, 7, 9, 10, 12, 17, 19, 20],
    edgeIDs: [4, 6, 7, 9, 10, 12, 18, 21, 23]
  },
  {
    nodeIDs: [4, 5, 6, 7, 9, 10, 12, 17, 19, 20],
    edgeIDs: [5, 6, 7, 9, 10, 12, 18, 21, 23]
  },
  {
    nodeIDs: [13, 12, 10, 9, 7, 6, 5, 3, 2, 1],
    edgeIDs: [14, 12, 10, 9, 7, 6, 4, 2, 1]
  },
  {
    nodeIDs: [14, 12, 10, 9, 7, 6, 5, 3, 2, 1],
    edgeIDs: [15, 12, 10, 9, 7, 6, 4, 2, 1]
  },
  {
    nodeIDs: [15, 12, 10, 9, 7, 6, 5, 3, 2, 1],
    edgeIDs: [16, 12, 10, 9, 7, 6, 4, 2, 1]
  },
  {
    nodeIDs: [16, 12, 10, 9, 7, 6, 5, 3, 2, 1],
    edgeIDs: [17, 12, 10, 9, 7, 6, 4, 2, 1]
  },
  {
    nodeIDs: [17, 12, 10, 9, 7, 6, 5, 3, 2, 1],
    edgeIDs: [18, 12, 10, 9, 7, 6, 4, 2, 1]
  },
  {
    nodeIDs: [18, 12, 10, 9, 7, 6, 5, 3, 2, 1],
    edgeIDs: [19, 12, 10, 9, 7, 6, 4, 2, 1]
  },
  {
    nodeIDs: [19, 17, 12, 10, 9, 7, 6, 5, 3, 2],
    edgeIDs: [21, 18, 12, 10, 9, 7, 6, 4, 2]
  },
  {
    nodeIDs: [20, 19, 17, 12, 10, 9, 7, 6, 5, 3],
    edgeIDs: [23, 21, 18, 12, 10, 9, 7, 6, 4]
  },
  {
    nodeIDs: [20, 19, 17, 12, 10, 9, 7, 6, 5, 4],
    edgeIDs: [23, 21, 18, 12, 10, 9, 7, 6, 5]
  }
];

module.exports = { len0, len1, len2, len3, len4, len5, len6, len7, len8, len9 };
