import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useGlobalState, bg1, bg2, bg3 } from "../../states/state";
import { API_KEY, API_URL, db, auth } from "../../config/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  query,
  getDoc,
  getDocs,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CTraining = ({ route }) => {
  const { phase } = route.params;
  const defaultBg = useGlobalState("defaultBackgroundImage");
  const [currentBg, setCurrentBg] = useState(
    defaultBg[0] === "bgOrange" ? bg3 : defaultBg[0] === "bgBlue" ? bg2 : bg1
  );
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const phases = {
    "Phase 1: Mindful Awareness": [
      "1) Can you name three things around you right now that bring your focus to the present moment?",
      "2) Would you like to try using your breath as a tool to ground yourself during times of anxiety or feeling overwhelmed?",
      "3) Could you identify any physical sensations in your body when stress starts to rise? How might you soothe them?",
      "4) Are you open to engaging in an activity mindfully today, giving it your full attention and experiencing it fully?",
      "5) Can you find small moments in your routine to practice mindfulness, enhancing your ability to manage stress?",
      "Good job! That's enough for today under this phase. You can continue in other categories or you can come back tomorrow",
    ],

    "Phase 2: Challenging Thought Patterns": [
      "1) When negative thoughts arise, could you gently reframe the situation to bring a more balanced view?",
      "2) Is it possible to find evidence that supports and contradicts your initial negative thoughts about a recent stressful situation?",
      "3) Imagine a friend with similar thoughts. What kind advice would you offer? Can you apply that advice to yourself?",
      "4) Could you list three strengths or qualities that empower you to overcome challenges and manage stress?",
      "5) When setting expectations, would you consider using flexible language instead of 'should' or 'must'? How might this shift your perspective?",
      "Good job! That's enough for today under this phase. You can continue in other categories or you can come back tomorrow.\n\n" +
        new Date().toDateString(),
    ],

    "Phase 3: Building Resilience": [
      "1) Can you recall a time when you skillfully coped with stress? How might you apply those strategies now?",
      "2) Would you be willing to practice self-compassion during tough times? How might you treat yourself kindly?",
      "3) Are you ready to set a small, positive goal for today to boost your well-being? How will you celebrate its achievement?",
      "4) Are there friends, family, or professionals you could lean on for support during stressful moments?",
      "5) Could you view a challenging situation as an opportunity for growth and personal development?",
      "Good job! That's enough for today under this phase. You can continue in other categories or you can come back tomorrow.\n\n" +
        new Date().toDateString(),
    ],

    "Phase 4: Stress Management Strategies": [
      "1) Could you outline a plan for breaking down a large task into smaller, manageable parts when overwhelmed?",
      "2) Would you be open to engaging in physical activities or exercises to release tension and reduce stress?",
      "3) Can you create a soothing environment or space to retreat to when you need a break from stress?",
      "4) What hobbies or activities do you enjoy? How might you incorporate them into your routine?",
      "5) Are you interested in experimenting with relaxation techniques (deep breathing, visualization, progressive muscle relaxation) to discover what works best for you?",
      "Good job! That's enough for today under this phase. You can continue in other categories or you can come back tomorrow.\n\n" +
        new Date().toDateString(),
    ],

    "Phase 5: Maintaining Balance": [
      "1) How might you establish clear boundaries between work, personal time, and relaxation to prevent burnout?",
      "2) Could you create a balanced weekly schedule that prioritizes self-care, social interactions, and pursuing hobbies?",
      "3) Can you describe your ideal sleep routine and how it contributes to better stress management? How could you work towards it?",
      "4) Would you like to identify stress sources within your control to change? How might you focus on them?",
      "5) Can you commit to reflecting on your accomplishments and progress regularly, regardless of their size?",
      "Good job! That's enough for today under this phase. You can continue in other categories or you can come back tomorrow.\n\n" +
        new Date().toDateString(),
    ],
  };
  const [prevConv, setPrevConv] = useState([]);
  useEffect(() => {
    const fetchPreviousConversations = async () => {
      const currentUserId = auth.currentUser.uid;
      const phaseDocRef = collection(
        db,
        "/Users/" +
          currentUserId +
          "/SavedConversations/" +
          "CongnitveTraining/" +
          phase
      );
      const q = query(
        phaseDocRef,
        where("lastSubmitted", ">", ""), // Filter documents with a lastSubmitted timestamp
        orderBy("lastSubmitted", "desc") // Order by lastSubmitted in descending order
      );

      try {
        const querySnapshot = await getDocs(q);
        var conversations = [];
        querySnapshot.forEach((doc) => {
          var c = conversations.concat(doc.data().conversation);
          conversations = c;
        });
        setPrevConv(conversations);
      } catch (error) {
        console.error("Error fetching previous conversations:", error);
      }
    };
    fetchPreviousConversations();
  }, []);

  const questions = phases[phase];
  const [isLastQuestion, setIsLastQuestion] = useState(
    currentQuestionIndex === questions.length - 1
  );
  const today = new Date().toISOString().split("T")[0]; // Get today's date in "yyyy-mm-dd" format
  useEffect(() => {
    const currentUserId = auth.currentUser.uid;
    const phaseRef = doc(
      db,
      "/Users/" +
        currentUserId +
        "/SavedConversations" +
        "/CongnitveTraining/" +
        phase,
      today
    );
    (async () => {
      try {
        const phaseSnapshot = await getDoc(phaseRef);
        if (phaseSnapshot.exists()) {
          setIsLastQuestion(true);
          setCurrentQuestionIndex(5);
        }
      } catch (error) {
        console.log(er);
      }
    })();
  }, []);

  const handleUserResponse = async () => {
    if (userInput.trim() === "") return;

    // Save question to the conversation stack
    const updatedConversationWithQuestion = [
      ...conversation,
      { type: "question", text: questions[currentQuestionIndex] },
    ];

    // Save user response to the conversation stack
    const updatedConversation = [
      ...updatedConversationWithQuestion,
      { type: "user", text: userInput },
    ];

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Act as a theraphist in my app name AnxietyBuddy. My application is anxiety management app so its goal is helping people with anxiety or simailar feeling.
              The app will ask the user a question for coginitive training and the user responds. I will provide you with the question and the user's response.
              Your task is generating a professional feedback as a theraphist based on the question and the user's response.
              the response should be short in under 50 words and it should be direct response so don't give it any title like therapist feedback or something, just give ther response only. Don't indicate whatever I said her to the user act like you are the app and responding to the user..
              Question: ${questions[currentQuestionIndex]},
              User's response for this qustion: ${userInput}
              `,
            },
          ],
        }),
      });
      const data = await response.json();
      const botResponse = data?.choices[0].message.content;
      const updatedConversationWithFeedback = [
        ...updatedConversation,
        { type: "feedback", text: botResponse },
      ];
      setConversation(updatedConversationWithFeedback);
      setIsLoading(false);

      if (!isLastQuestion) {
        // Move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserInput(""); // Clear the input field
      }
      setIsLastQuestion(currentQuestionIndex === questions.length - 2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLastQuestion && !isLoading) {
      const currentUserId = auth.currentUser.uid;
      (async () => {
        try {
          const phaseDocRef = doc(
            db,
            "/Users/" +
              currentUserId +
              "/SavedConversations" +
              "/CongnitveTraining/" +
              phase,
            today
          );
          const phaseDocSnapshot = await getDoc(phaseDocRef);

          if (!phaseDocSnapshot.exists()) {
            // If the document doesn't exist, save the conversation and update the timestamp
            setDoc(phaseDocRef, {
              conversation: conversation,
              lastSubmitted: today,
            });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    }
  }, [isLastQuestion]);

  const scrollViewRef = useRef();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBg}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <Text style={styles.phaseTitle}>{phase}</Text>

        <KeyboardAwareScrollView
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {prevConv.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                message.type === "user"
                  ? styles.userMessageContainer
                  : styles.feedbackMessageContainer,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}

          {conversation.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                message.type === "user"
                  ? styles.userMessageContainer
                  : styles.feedbackMessageContainer,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}

          <View
            style={[styles.messageContainer, styles.feedbackMessageContainer]}
          >
            <Text style={styles.messageText}>
              {questions[currentQuestionIndex]}
            </Text>
          </View>
          {isLoading && (
            <ActivityIndicator
              size={"large"}
              color={"blue"}
            ></ActivityIndicator>
          )}
          {!isLastQuestion && (
            <View style={styles.userInputContainer}>
              <TextInput
                style={styles.userInput}
                placeholder="Type your response here"
                value={userInput}
                onChangeText={(text) => setUserInput(text)}
                multiline
                editable={!isLastQuestion}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  isLastQuestion && styles.desabledButton,
                ]}
                onPress={isLastQuestion ? undefined : handleUserResponse} // Prevent click on the button if it's the last question
              >
                <Text style={styles.sendButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chatContent: {
    paddingTop: 20,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#EFEFEF",
  },
  feedbackMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#F9F9F9",
  },
  messageText: {
    fontSize: 16,
  },
  userInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  userInput: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    height: 70,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 5,
    backgroundColor: "#008000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  desabledButton: {
    marginLeft: 5,
    backgroundColor: "#9fa6b2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default CTraining;
