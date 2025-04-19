/**
 * Medium Level JavaScript Programming Problems
 */

// 1. Find the Longest Substring Without Repeating Characters
// Write a function to find the length of the longest substring without repeating characters in a given string.
// Example: Input: "abcabcbb"  Output: 3  (The answer is "abc")

function longestSubString(s) {
  let n = s.length;
  let maxLength = 0;
  let start = 0;
  let charIndexMap = new Map();

  for (let i = 0; i < n; i++) {
    if (charIndexMap.has(s[i])) {
      start = Math.max(charIndexMap.get(s[i]) + 1, start);
    }
    charIndexMap.set(s[i], i);
    maxLength = Math.max(maxLength, i - start + 1);
  }
  return maxLength;
}

// 2. 3Sum Problem
// Given an array of integers, find all unique triplets in the array that sum up to zero.
// Example: Input: [-1,0,1,2,-1,-4]  Output: [[-1,-1,2],[-1,0,1]]

// 3. Group Anagrams
// Given an array of strings, group the anagrams together.
// Example: Input: ["eat","tea","tan","ate","nat","bat"]  Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

// 4. Rotate a 2D Matrix
// Rotate a given n x n 2D matrix 90 degrees clockwise.
// Example: Input: [[1,2,3],[4,5,6],[7,8,9]]  Output: [[7,4,1],[8,5,2],[9,6,3]]

// 5. Binary Search in a Rotated Sorted Array
// Search for a target value in a rotated sorted array and return its index. If not found, return -1.
// Example: Input: nums = [4,5,6,7,0,1,2], target = 0  Output: 4

// 6. Find the First and Last Position of an Element in a Sorted Array
// Given a sorted array, find the starting and ending position of a given target value.
// Example: Input: nums = [5,7,7,8,8,10], target = 8  Output: [3,4]

// 7. Container With Most Water
// Given n non-negative integers representing the heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.
// Example: Input: [1,8,6,2,5,4,8,3,7]  Output: 49

// 8. Validate a Binary Search Tree
// Given the root of a binary tree, determine if it is a valid binary search tree.
// Example: Input: [2,1,3]  Output: true

// 9. Word Ladder
// Given two words (beginWord and endWord) and a dictionary, find the shortest transformation sequence from beginWord to endWord, changing only one letter at a time.
// Example: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]  Output: 5

// 10. Find All Duplicates in an Array
// Given an array of integers, find all the elements that appear twice.
// Example: Input: [4,3,2,7,8,2,3,1]  Output: [2,3]
