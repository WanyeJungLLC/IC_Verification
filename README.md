# IC_Verification

This repository is for **IC verification** — made to encourage transparency, accountability, and a little bit of fun.  

I made this so the tird muffins being meany weinies on the DFINITY Forum can donate to a good cause.  

Let's find out how many licks it takes to get to the center of this tootsie pop — and if the team is good on their word/payment.  
I'll admit, finding the person who deserves to have the funds donated is, at best, difficult. However, if this individual (I will not name drop) chooses to finally be constructive, I want to see it through.  

To the person they find and donate to — you’ll never know me. However, don’t become a monster. Remember where you are right now — that passion and that fuel. Don’t let the future ruin your bootyhole like it has done to the rest of us...

Lastly, in your moments of doubt, always remember: someone out there can get a big jerk like this team to donate to you. You can do it too.  

---

# 🧠 Getting Started

Now that you've entered the domain of coding, we can begin verifying the proposal hashes match the ones in the current proposal.

---

# START HERE BOO BOO 💻

1. Open your GitHub account (or make a new one if needed — follow documentation if necessary).
2. Click **New Repository**.
3. Choose whether to make it **Public** or **Private**.
4. Click **Create Repository**.
5. Click **New Codespace** to open the GitHub IDE Codespace environment.
6. Click the three-lined menu (☰), then select **Terminal → New Terminal**.

---

### ⚙️ Before You Go Further

Do you know what **Motoko** is?  
- If yes → move on.  
- If no → see documentation.

---

Do you know how to install **Software Development Kits (SDKs)**?  
- If yes → move on.  
- If no → see documentation.


---

# Podman Installation:
``bash sudo apt update sudo apt install -y podman``



---


# Rust Installation:

``curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh``

Check Rust installation:

``rustc --version``


---



# Install DFX (IC SDK):

1.) Install DFX — the Software Development Kit for the Internet Computer (IC):

``curl -sSf https://internetcomputer.org/install.sh | bash``

2.) Restart the terminal or open a new one, then confirm installation:

``dfx --version``


***You should see something like:**

``dfx 0.15.x``

***If you get a “command not found” error, run:**

``export PATH="$HOME/.cache/dfx/bin:$PATH"``

***Then check again:**

``dfx --version``



---



# 🧬 Clone the Repository:

1.) Clone your IC verification repo:

``git clone https://github.com/JohnSmith/IC_verification.git
cd IC_verification``

***Replace JohnSmith with your own GitHub username.**

2.)	If your repo name differs, change the directory name accordingly:

``cd <your-repo-name>``



***This creates a local folder for your repo.
For this example, it’s named IC_Verification.**



---

🛠️ Add the Verification Script

1.) Create the script file:

``nano verify_ic_proposal.sh``

***This creates a new file called verify_ic_proposal.sh.**

2.) Paste the following script inside:

```bash
#!/bin/bash

echo "✅ Script started"

read -p "🔢 Enter Proposal ID: " PROPOSAL_ID
read -p "🔗 Enter Git Commit Hash: " COMMIT_HASH
read -p "🔐 Enter Expected WASM Hash: " ONCHAIN_HASH

CANISTER_PATH="./artifacts/canisters/governance-canister.wasm.gz"
REPORT_PATH="../sample-output/proposal-${PROPOSAL_ID}.txt"

echo "📥 Cloning IC repo..."
git clone https://github.com/dfinity/ic
cd ic || { echo "❌ Failed to enter ic directory"; exit 1; }

echo "📌 Checking out commit $COMMIT_HASH..."
git fetch
git checkout "$COMMIT_HASH"

echo "🔧 Building governance canister..."
./gitlab-ci/container/build-ic.sh -c

echo "🔐 Calculating SHA-256 hash..."
if [ -f "$CANISTER_PATH" ]; then
    LOCAL_HASH=$(sha256sum "$CANISTER_PATH" | awk '{print $1}')
else
    echo "❌ Binary not found at $CANISTER_PATH"
    exit 1
fi

mkdir -p ../sample-output
{
echo "📊 Internet Computer Proposal Verification Report"
echo ""
echo "Proposal ID: $PROPOSAL_ID"
echo "Commit Hash: $COMMIT_HASH"
echo "Canister: governance"
echo "Binary: $CANISTER_PATH"
echo ""
echo "🔐 SHA-256 Hash:"
echo "Local Hash:    $LOCAL_HASH"
echo "On-Chain Hash: $ONCHAIN_HASH"
echo ""
if [ "$LOCAL_HASH" == "$ONCHAIN_HASH" ]; then
    echo "✅ Match Status: The hashes are identical. Proposal verified successfully."
else
    echo "❌ Match Status: The hashes do not match."
fi
echo ""
echo "📤 Shared via: GitHub / IC Forum / Twitter"
} > "$REPORT_PATH"

echo "📝 Report saved to: $REPORT_PATH"
```



---
💾 Save and Exit

Press:
	•	Ctrl + O → (save)
	•	Enter → (confirm)
	•	Ctrl + X → (exit)
	
---

🔓 Make It Executable

``chmod +x verify_ic_proposal.sh``


---

▶️ Run the Script

``./verify_ic_proposal.sh``

***If you see:**

``bash: ./verify_ic_proposal.sh: Permission denied``

***Run this again:**

``chmod +x verify_ic_proposal.sh``

***Then rerun:**

``./verify_ic_proposal.sh``

---

🧮 Input Fields

You’ll be prompted to enter:

	•	Proposal ID (e.g. 129394)
	
	•	Git Commit Hash (e.g. 56c706b487ce455abcd0dc900bd2a902ee460208)
	
	•	Expected WASM Hash (e.g. f96d410adab829bee9ff7eac89697f71fe5d36e88e5b68690db3204a37d4224f)


---

⚡ Script Actions

The script will:
	
	1.	Clone the IC repo

	
	2.	Checkout the correct commit

	
	3.	Build the governance canister

	
	4.	Generate the SHA-256 hash

	
	5.	Compare the local hash with the on-chain hash

	
	6.	Save a report to: sample-output/proposal-<ID>.txt



---

🌍 Share Your Results

Once verified, you can:
	•	Upload the report to your GitHub repository
	•	Post your results on the Internet Computer Forum
	•	Share them proudly on social media 🎉

---


##  Official Documentation
 [https://internetcomputer.org/docs/building-apps/governing-apps/nns/concepts/proposals/verify-proposals](https://internetcomputer.org/docs/building-apps/governing-apps/nns/concepts/proposals/verify-proposals)

[https://learn.internetcomputer.org/hc/en-us/articles/34084113508500-Proposals](https://learn.internetcomputer.org/hc/en-us/articles/34084113508500-Proposals)

[https://learn.internetcomputer.org/hc/en-us/articles/34140518658068-Proposal-Topics-and-Types](https://learn.internetcomputer.org/hc/en-us/articles/34140518658068-Proposal-Topics-and-Types)

[https://learn.internetcomputer.org/hc/en-us/articles/34142993417108-Voting-Rewards](https://learn.internetcomputer.org/hc/en-us/articles/34142993417108-Voting-Rewards)

## Proposal Example
[https://dashboard.internetcomputer.org/proposal/129394](https://dashboard.internetcomputer.org/proposal/129394)


## Video Guides
[https://www.youtube.com/watch?v=BsIg4JZobqU](https://www.youtube.com/watch?v=BsIg4JZobqU)

[https://www.youtube.com/watch?v=i_ANhb0E1Io](https://www.youtube.com/watch?v=i_ANhb0E1Io)

[https://www.youtube.com/watch?v=z3rAQBkO8uI](https://www.youtube.com/watch?v=z3rAQBkO8uI)


---
Made with love, sarcasm, and a dash of digital rebellion.


# Q&A DOCUMENT SHEET (BLANK COPY)

### Name: Summerhouse Productions 

### Date: It’s my Party I can cry if I want to.


### Topic / Subject Area: IC verification 



**Question 1:**
What are the proposal types that require verification? Please list, provide specific links to their material, and old proposals for practice/ reference. 

	Answer:
	
	


**Question 2:**
What does each of the verifications do? Please explain in detail for each proposal type. Give examples for each.  


	Answer:




**Question 3**
Why is verifying them so crucial for the network and furthering decentralization?  Please answer per proposal type. 


	Answer:




**Question 4**
What happens if stake holders decide to not verify and pen stroke “yes” or “no”, instead of verifying? Please provide explicit examples for each proposal type.


	Answer:




**Question 5**
How often do “fake/ spam” proposals come through? Is this really a risk or a redundant back up process? 


	Answer:




**Question 6**
	Can you explain what the different types of hashes mean? 




	Answer:







**Question 7** Are there scripts that can be used to run for each of the proposals? If so, please provide supporting material.



	Answer:




**Question 8** In the proposals it provides different commands. Why do they not separate them and make each step explicit and bake it right into the proposal form?



	Answer:




**Question 9** Why don’t they make a few simple dapps where their functionality is to just plug and play the hashes so anyone can do it? 



	Answer:






**Question 10** How much do proposal verifiers get paid? Is this an actual job at this point? 



	Answer:




**Question 11**
Are we wasting money on validators? Not a dig a genuine ask.


	Answer:




**Question 12**
On a technical level are you able to explain what, why and how, each of the hashes are made, used and changed? 


	Answer:








**Question 13:**
On a given proposal how many validators normally share and pitch in?


	Answer:




**Question 14:** I notice the documentation they provide is more in depth than a simple “Yes, they match”. Please explain their deliverable documentations, what each section means, and how other verifiers can do this independently.



	Answer: 




**Question 15:** As of right now (October 7, 2025) How many companies, groups, org, or people employ paid verifiers? 


	Answer:







**Question 16:** Please provide information for each, including who owns it, who runs it, who’s the manager of the staff, how each is funded, where funds came/come from and their plans to sustain.  





	Answer:





Notes / Key Takeaways:

Please let me know if...
you like piña coladas
And gettin' caught in the rain
And the feel of the ocean
And the taste of champagne
If you like making love at midnight
In the dunes on the cape
You're the lady I've looked for
Come with me and escape…






# ✅ IC Verification Q&A Guide  


---

## 📌 Question 1: What Proposal Types Require Verification?

| Proposal Type | Description | Reference |
|---------------|-------------|-----------|
| **Canister Upgrade Proposals** | Modify core system canisters (e.g., governance, ledger, registry). Require reproducibility checks. | [Verify Proposals Guide](https://internetcomputer.org/docs/building-apps/governing-apps/nns/concepts/proposals/verify-proposals) |
| **IC OS Version Election Proposals** | Upgrade the replica software running on nodes. Require hash verification and reproducible builds. | [DFINITY Forum](https://forum.dfinity.org/t/announcements-of-ic-os-updates/50763) |
| **Node Provider & Data Center Proposals** | Add/remove node providers or data centers. Require identity document hash matching. | [Node Provider Verification](https://internetcomputer.org/docs/building-apps/governing-apps/nns/concepts/proposals/verify-proposals) |
| **Participant Management Proposals** | Update node configurations or admin roles. Require validation of submitted parameters. | [Proposal 138130](https://nns.ic0.app/proposal/?u=qoctq-giaaa-aaaaa-aaaea-cai&proposal=138130) |

---

## 🔍 Question 2: What Does Each Verification Do?

- **Canister Upgrade**: Confirms Wasm binary matches source code at a specific Git commit.
- **IC OS Version**: Validates upgrade image reproducibility from claimed source.
- **Node Provider**: Matches identity document hashes to ensure authenticity.
- **Participant Management**: Verifies configuration parameters against registry expectations.

Example: Proposal 138130 used `verify-hash` scripts to confirm Internet Identity upgrade integrity.

---

## 🛡️ Question 3: Why Is Verification Crucial?

| Proposal Type | Importance |
|---------------|------------|
| **Canister Upgrades** | Prevents protocol compromise and malicious code deployment. |
| **IC OS Elections** | Ensures node software is reproducible and secure. |
| **Node Provider Proposals** | Avoids onboarding fraudulent identities. |
| **Participant Management** | Maintains subnet stability and configuration integrity. |

---

## ✍️ Question 4: What Happens If Stakeholders Vote Without Verifying?

- **Canister Upgrades**: Risk of deploying unverified code.
- **IC OS Elections**: Nodes may run unstable or compromised software.
- **Node Provider Proposals**: Fake identities could be added.
- **Participant Management**: Misconfigured nodes could destabilize the network.

Example: A mismatched Wasm hash could pass unnoticed, leading to irreversible deployment.

---

## 🧨 Question 5: Are Fake/Spam Proposals Common?

- Rare due to 25 ICP submission fee.
- Verification is a critical safeguard, not redundant.
- Prevents subtle tampering and ensures proposal legitimacy.

---

## 🔢 Question 6: What Do the Hashes Mean?

| Hash Type | Purpose |
|-----------|---------|
| **SHA-256** | Verifies Wasm binaries and upgrade images. |
| **Git Commit Hash** | Identifies exact source code version. |
| **Document Hashes** | Used for identity verification in node provider proposals. |

Each hash ensures tamper-proof integrity of submitted materials.

---

## 🧪 Question 7: Are There Scripts for Verification?

Yes. Examples:

```bash
# Reproducibility check for IC OS
curl --proto '=https' --tlsv1.2 -sSLO https://raw.githubusercontent.com/dfinity/ic/<commit>/gitlab-ci/tools/repro-check.sh
chmod +x repro-check.sh
./repro-check.sh -c <commit>

# Canister hash verification
./scripts/verify-hash --ii-hash <hash> --archive-hash <hash>
```

Source: [DFINITY GitHub](https://github.com/dfinity/ic)

---

## 🧩 Question 8: Why Aren’t Commands Separated in Proposals?

- Bundled for atomic execution.
- Current format prioritizes efficiency over clarity.
- Community feedback is pushing for modular, explicit formats.

---

## 🧰 Question 9: Why No Plug-and-Play Dapps for Hash Verification?

- Security concerns (e.g., spoofing).
- Complexity of reproducibility.
- CLI preferred for precision.

Grassroots efforts like [proposals.network](https://proposals.network) are exploring UI-based verification tools.

---

## 💸 Question 10: Do Verifiers Get Paid?

- No formal compensation.
- Some neurons receive voting rewards.
- Organizations may fund internal verification teams.

---

## 💰 Question 11: Are We Wasting Money on Validators?

- Validators secure the network and execute governance.
- Without verification, votes may be misused.
- Cost is justified if validators actively verify proposals.

---

## 🧬 Question 12: Technical Explanation of Hashes

- **Creation**: Generated using SHA-256 or Git commit algorithms.
- **Usage**: Verify integrity of binaries, documents, and source commits.
- **Change**: Any input change alters the hash completely.

Ensures tamper-proof reproducibility.

---

## 👥 Question 13: How Many Validators Pitch In?

- Typically 3–5 active validators per proposal.
- Some rely on DFINITY or community leaders.
- Ideal: every neuron with voting power should verify.

---

## 📄 Question 14: What’s in the Deliverable Documentation?

| Section | Purpose |
|---------|---------|
| **Proposal Summary** | Overview of the proposed change. |
| **Source Commit** | Git hash and repo link. |
| **Build Instructions** | Steps to reproduce the binary. |
| **Hash Comparison** | Expected vs. actual hash. |
| **Validation Logs** | Output of verification scripts. |

Allows independent reproduction and verification.

---

## 🏢 Question 15: Who Employs Paid Verifiers?

| Entity | Role |
|--------|------|
| **DFINITY Foundation** | Internal verification team. |
| **Internet Computer Association (ICA)** | May fund verification efforts. |
| **Community DAOs** | Occasionally fund contributors. |

Most verification is voluntary or indirectly funded.

---

## 🧾 Question 16: Details on Verification Organizations

| Entity | Ownership | Management | Funding | Sustainability |
|--------|-----------|------------|---------|----------------|
| **DFINITY Foundation** | Swiss nonprofit | R&D teams | ICP treasury, grants | Internal roadmap |
| **ICA** | Community-led | Contributor board | Treasury allocations | Ecosystem support |
| **Proposals.network** | Independent devs | Maintainers | Donations, open-source | Exploring SNS launch |
| **Community Neurons** | Individual stakers | Self-managed | Voting rewards | Voluntary, not guaranteed |

---


